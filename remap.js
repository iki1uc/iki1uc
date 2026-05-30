/* remap.js
   - Remap Buttons -> alte Funktionen (Aliase)
   - Chunked loader (data/<base>_part1..N.json)
   - Fallback Orchestrator (wenn Modul fehlt -> zwei Ersatzmodule)
   - Seeded Random + Lemming Routine
   - Presence Broadcast (BroadcastChannel / localStorage / optional WS)
   - StorySlope integration (setStorySlope)
   - Hooks für cube_sim.js (applyImpulse, setCubeState)
   - Debug / safe defaults
*/

/* ===========================
   Konfiguration / Globals
   =========================== */
const SEEU = window.SEEU = window.SEEU || {};
SEEU.seed = SEEU.seed || 123456789;
const rand = (function(s){
  let x = s >>> 0;
  return ()=> { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; };
})(SEEU.seed);

const projectConfig = {
  chunks: 16,
  fallbackMap: {
    // Beispiel: wenn moduleA fehlt, aktiviere moduleB + moduleC
    "moduleA": ["moduleB","moduleC"]
  },
  lemming: { enabled:true, intensity:0.08 },
  slope: { maxImpulse:0.22, noise:0.03, smooth:0.12, deadzone:0.02 },
  presenceChannel: 'seeu-presence'
};

/* ===========================
   Alte Funktionen (Platzhalter)
   - Falls du echte Implementationen hast, belasse sie.
   - Diese Aliase sorgen für Rückwärtskompatibilität.
   =========================== */
function oldNext(){ console.log('oldNext (placeholder)'); }
function oldPrev(){ console.log('oldPrev (placeholder)'); }
function oldCenter(){ console.log('oldCenter (placeholder)'); }

// expose aliases global
window.oldNext = window.oldNext || oldNext;
window.oldPrev = window.oldPrev || oldPrev;
window.oldCenter = window.oldCenter || oldCenter;

/* ===========================
   UI Remap: Buttons -> alte Funktionen
   (IDs: btnKlicK, btnZacK, btn4ALL)
   =========================== */
function safeGet(id){ return document.getElementById(id); }
safeGet('btnKlicK')?.addEventListener('click', ()=> { try{ oldNext(); }catch(e){ console.warn(e); } });
safeGet('btnZacK')?.addEventListener('click', ()=> { try{ oldPrev(); }catch(e){ console.warn(e); } });
safeGet('btn4ALL')?.addEventListener('click', ()=> { try{ oldCenter(); }catch(e){ console.warn(e); } });

/* ===========================
   Presence: BroadcastChannel / localStorage / optional WS
   - broadcastState(payload)
   - applyRemoteState(payload)
   =========================== */
let bc = null;
try{
  bc = new BroadcastChannel(projectConfig.presenceChannel);
  bc.onmessage = e => applyRemoteState(e.data);
}catch(e){ bc = null; }

window.addEventListener('storage', e=>{
  if(e.key === 'seeu_presence' && e.newValue){
    try{ applyRemoteState(JSON.parse(e.newValue)); }catch(err){}
  }
});

SEEU.wsSend = SEEU.wsSend || function(payload){
  // optional: if you attach a WebSocket to SEEU.SEEU_WS, use it here
  if(window.SEEU_WS && window.SEEU_WS.readyState === 1){
    try{ window.SEEU_WS.send(JSON.stringify(payload)); }catch(e){}
  }
};

function broadcastState(payload){
  try{
    if(bc) bc.postMessage(payload);
  }catch(e){}
  try{
    localStorage.setItem('seeu_presence', JSON.stringify(payload));
  }catch(e){}
  try{ SEEU.wsSend(payload); }catch(e){}
}

function applyRemoteState(payload){
  if(!payload) return;
  // if remote contains state, tilt, slope etc. merge gently
  if(payload.state && typeof payload.state === 'string'){
    if(typeof SEEU.setCubeState === 'function') SEEU.setCubeState(payload.state);
  }
  if(payload.tilt && payload.ts && payload.ts > (window._seeu_last_ts||0)){
    window._seeu_last_ts = payload.ts;
    if(typeof SEEU.applyRemoteTilt === 'function') SEEU.applyRemoteTilt(payload.tilt);
  }
  if(payload.type === 'slope' && typeof payload.slope === 'number'){
    // remote slope: blend into local storySlopeRaw
    storySlopeRaw = storySlopeRaw * 0.6 + payload.slope * 0.4;
  }
}

/* ===========================
   Chunked Data Loader
   - loadChunkedContent(baseName, containerId, parts)
   - erwartet data/<baseName>_part{1..N}.json
   =========================== */
async function loadChunkedContent(baseName, containerId, parts = projectConfig.chunks){
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '<p>lade Inhalte…</p>';
  for(let i=1;i<=parts;i++){
    try{
      const resp = await fetch(`data/${baseName}_part${i}.json`);
      if(!resp.ok) { console.warn('chunk not found', i); break; }
      const json = await resp.json();
      renderItems(json.items || [], container);
      // small breathing pause to keep UI responsive
      await new Promise(r=>setTimeout(r, 30));
    }catch(e){
      console.warn('chunk load error', e);
      break;
    }
  }
}

function renderItems(items, container){
  // minimal renderer: append paragraphs; replace with your renderer
  items.forEach(it=>{
    const p = document.createElement('p');
    p.textContent = it.text || JSON.stringify(it);
    container.appendChild(p);
  });
}

/* ===========================
   Fallback Orchestrator
   - ensureModule(moduleName): returns true if module available or fallbacks activated
   =========================== */
function ensureModule(moduleName){
  if(window[moduleName]) return true;
  const fallbacks = projectConfig.fallbackMap[moduleName] || [];
  let activated = 0;
  fallbacks.forEach(m=>{
    if(window[m]) { try{ window[m](); activated++; }catch(e){} }
  });
  // if not enough fallbacks, try to activate generic replacements
  if(activated < 2){
    // try to call generic 'moduleFallback' if present
    if(typeof window.moduleFallback === 'function'){ try{ window.moduleFallback(moduleName); activated++; }catch(e){} }
  }
  return activated >= 2;
}

/* ===========================
   Seeded Random + Lemming Routine
   - lemmingRun(containerId, intensity)
   - lemmingOnce() for single trigger
   =========================== */
function lemmingRun(containerId, intensity = projectConfig.lemming.intensity){
  if(!projectConfig.lemming.enabled) return;
  const container = document.getElementById(containerId);
  if(!container) return;
  const nodes = Array.from(container.children);
  nodes.forEach(node=>{
    if(rand() < intensity){
      node.classList.add('highlight');
      setTimeout(()=>node.classList.remove('highlight'), 800 + Math.floor(rand()*1200));
    }
  });
}
SEEU.lemmingOnce = function(){
  const container = document.getElementById('content');
  if(!container) return;
  const nodes = Array.from(container.children);
  if(nodes.length === 0) return;
  const idx = Math.floor(rand() * nodes.length);
  const node = nodes[idx];
  node.classList.add('highlight');
  setTimeout(()=>node.classList.remove('highlight'), 900 + Math.floor(rand()*900));
};

/* periodic lemming */
setInterval(()=>lemmingRun('content', projectConfig.lemming.intensity), 2000);

/* ===========================
   StorySlope Integration
   - setStorySlope(v)  // v in [-1..1]
   - maps slope -> applyImpulse
   =========================== */
let storySlopeRaw = 0;
let storySlopeSmooth = 0;

SEEU.setStorySlope = function(v){
  if(typeof v !== 'number' || isNaN(v)) return;
  if(v > 1) v = 1; if(v < -1) v = -1;
  storySlopeRaw = v;
  broadcastState({type:'slope', slope:v, ts:Date.now()});
};

function applyRemoteSlope(v){
  if(typeof v !== 'number') return;
  storySlopeRaw = v;
}

function slopeToImpulse(){
  const cfg = projectConfig.slope;
  storySlopeSmooth = storySlopeSmooth * (1 - cfg.smooth) + storySlopeRaw * cfg.smooth;
  if(Math.abs(storySlopeSmooth) < cfg.deadzone) return null;
  const base = storySlopeSmooth * cfg.maxImpulse;
  const noise = (rand()*2 - 1) * cfg.noise;
  const ix = base + noise;
  const iy = base * 0.35 + noise * 0.5;
  const max = cfg.maxImpulse;
  return { ix: Math.max(-max, Math.min(max, ix)), iy: Math.max(-max, Math.min(max, iy)) };
}

/* periodic slope application */
setInterval(()=>{
  const imp = slopeToImpulse();
  if(imp){
    // brief busy feedback
    if(Math.hypot(imp.ix, imp.iy) > projectConfig.slope.maxImpulse * 0.6){
      if(typeof SEEU.setCubeState === 'function') SEEU.setCubeState('busy');
    }
    if(typeof SEEU.applyImpulse === 'function') SEEU.applyImpulse(imp.ix, imp.iy);
    else if(typeof applyImpulse === 'function') applyImpulse(imp.ix, imp.iy);
  }
}, 300);

/* fallback when slope absent */
let lastSlopeSeenTs = Date.now();
setInterval(()=>{
  if(Math.abs(storySlopeRaw) > 0.0001) lastSlopeSeenTs = Date.now();
  if(Date.now() - lastSlopeSeenTs > 6000){
    // Ersatz 1: leichter zufallsimpuls
    const r1 = (rand()*2 - 1) * (projectConfig.slope.maxImpulse * 0.12);
    const r2 = (rand()*2 - 1) * (projectConfig.slope.maxImpulse * 0.08);
    if(typeof SEEU.applyImpulse === 'function') SEEU.applyImpulse(r1, r2);
    else if(typeof applyImpulse === 'function') applyImpulse(r1, r2);
    // Ersatz 2: Lemming once
    SEEU.lemmingOnce();
    if(typeof SEEU.setCubeState === 'function') SEEU.setCubeState('busy');
    lastSlopeSeenTs = Date.now();
  }
}, 2000);

/* ===========================
   Hooks for cube_sim.js and debug helpers
   - expose applyImpulse, setCubeState if not present
   - applyRemoteTilt hook for remote blending
   =========================== */
if(!SEEU.applyImpulse){
  SEEU.applyImpulse = function(ix, iy){
    // default: small visual nudge if cube exists
    try{
      const cube = document.getElementById('cube');
      if(cube){
        // quick transform nudge (non-physical)
        const prev = cube.style.transform || '';
        cube.style.transition = 'transform 0.18s ease';
        cube.style.transform = (prev ? prev + ' ' : '') + ` translateZ(0)`;
        setTimeout(()=>{ cube.style.transition = ''; }, 220);
      }
    }catch(e){}
    // broadcast impulse event
    broadcastState({type:'impulse', impulse:{ix,iy}, ts:Date.now()});
  };
}

if(!SEEU.setCubeState){
  SEEU.setCubeState = function(state){
    const cube = document.getElementById('cube');
    if(cube){
      cube.classList.remove('state-online','state-busy','state-offline');
      cube.classList.add('state-'+state);
    }
    broadcastState({state, ts:Date.now()});
  };
}

SEEU.applyRemoteTilt = SEEU.applyRemoteTilt || function(t){ /* optional hook for cube_sim */ };

/* ===========================
   Page Init: auto-load content per filename
   - iki.html -> base 'iki'
   - 1.html  -> base 'one'
   - uc.html -> base 'uc'
   =========================== */
(function initPage(){
  const path = location.pathname.split('/').pop();
  if(path === 'iki.html') loadChunkedContent('iki','content', projectConfig.chunks);
  else if(path === '1.html' || path === '1') loadChunkedContent('one','content', projectConfig.chunks);
  else if(path === 'uc.html') loadChunkedContent('uc','content', projectConfig.chunks);
  // show tbc if 1.html
  const tbc = document.getElementById('tbcMsg');
  if(tbc) tbc.style.display = (path === '1.html') ? 'block' : 'none';
})();

/* ===========================
   Small CSS helper injection for .highlight if not present
   =========================== */
(function ensureHighlightCSS(){
  if(document.getElementById('seeu-highlight-style')) return;
  const s = document.createElement('style');
  s.id = 'seeu-highlight-style';
  s.textContent = `.highlight{ background: linear-gradient(90deg, rgba(255,240,200,0.95), rgba(255,255,255,0.0)); transition: background .6s ease; }`;
  document.head.appendChild(s);
})();

/* ===========================
   Expose debug getters
   =========================== */
SEEU.getStorySlope = ()=> ({ raw: storySlopeRaw, smooth: storySlopeSmooth });
SEEU.getConfig = ()=> projectConfig;

console.log('remap.js initialized');
