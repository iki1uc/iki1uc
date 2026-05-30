/* --- StorySlope Integration für cube_sim.js --- */
/* Erwartet: vorhandene applyImpulse(ix,iy), broadcast(payload), rand() */

(function(){
  // Konfiguration
  const SLOPE_MAX_IMPULSE = 0.22;   // maximale Impulsstärke aus StorySlope
  const SLOPE_NOISE = 0.03;        // zusätzliches Rauschen
  const SLOPE_SMOOTH = 0.12;       // Glättungsfaktor (0..1) für exp. moving average
  const SLOPE_DEADZONE = 0.02;     // kleine Werte ignorieren
  const SLOPE_TO_ANGLE_RATIO = 1.0; // optional Skalierung

  // interner Zustand
  let storySlopeRaw = 0;    // zuletzt gelieferter Rohwert (-1..1)
  let storySlopeSmooth = 0; // geglätteter Wert

  // externe API: setStorySlope(-1..1)
  window.SEEU = window.SEEU || {};
  window.SEEU.setStorySlope = function(v){
    if(typeof v !== 'number' || isNaN(v)) return;
    // clamp
    if(v > 1) v = 1; if(v < -1) v = -1;
    storySlopeRaw = v;
    // broadcast slope for other tabs
    broadcast({type:'slope', slope:v, ts:Date.now()});
  };

  // wenn remote slope empfangen wird, blend sanft
  function applyRemoteSlope(v){
    if(typeof v !== 'number') return;
    storySlopeRaw = v;
  }

  // storage listener (falls BroadcastChannel nicht verfügbar)
  window.addEventListener('storage', e=>{
    if(e.key === 'seeu_presence' && e.newValue){
      try{
        const p = JSON.parse(e.newValue);
        if(p && p.type === 'slope' && typeof p.slope === 'number') applyRemoteSlope(p.slope);
      }catch(e){}
    }
  });

  // Mapping: aus geglättetem Slope wird ein Impuls
  function slopeToImpulse(){
    // glätten (EMA)
    storySlopeSmooth = storySlopeSmooth * (1 - SLOPE_SMOOTH) + storySlopeRaw * SLOPE_SMOOTH;
    // Deadzone
    if(Math.abs(storySlopeSmooth) < SLOPE_DEADZONE) return null;
    // Basisimpuls entlang X (KlicK/ZacK) und kleines Y‑Offset für Dynamik
    const base = storySlopeSmooth * SLOPE_MAX_IMPULSE * SLOPE_TO_ANGLE_RATIO;
    const noise = (rand()*2 - 1) * SLOPE_NOISE;
    const ix = base + noise;
    const iy = base * 0.35 + noise * 0.5; // leichter Y‑Anteil
    // Limitierung
    const max = SLOPE_MAX_IMPULSE;
    return { ix: Math.max(-max, Math.min(max, ix)), iy: Math.max(-max, Math.min(max, iy)) };
  }

  // Routine: periodisch prüfen und Impulse anwenden
  setInterval(()=>{
    const imp = slopeToImpulse();
    if(imp){
      // bei starken Impulsen kurz busy anzeigen
      const strength = Math.hypot(imp.ix, imp.iy);
      if(strength > SLOPE_MAX_IMPULSE * 0.6) {
        // setCubeStateLocal ist in cube_sim.js vorhanden; falls nicht, nutze SEEU.setCubeState
        if(window.SEEU && typeof window.SEEU.setCubeState === 'function') window.SEEU.setCubeState('busy');
        else if(typeof setCubeStateLocal === 'function') setCubeStateLocal('busy');
      }
      // Impuls anwenden (nutzt vorhandene applyImpulse)
      if(typeof window.SEEU?.applyImpulse === 'function') window.SEEU.applyImpulse(imp.ix, imp.iy);
      else if(typeof applyImpulse === 'function') applyImpulse(imp.ix, imp.iy);
    } else {
      // kein signifikanter Slope: nichts tun
    }
  }, 300); // alle 300ms prüfen (anpassbar)

  // Fallback‑Mechanik: wenn slope fehlt (z.B. null) -> hebe zwei Ersatz‑Ebenen an
  // Beispiel: aktiviere RandomGenerator + LemmingRoutine
  let lastSlopeSeenTs = Date.now();
  setInterval(()=>{
    // update lastSeen
    if(Math.abs(storySlopeRaw) > 0.0001) lastSlopeSeenTs = Date.now();
    // wenn länger als 6s kein Slope, aktiviere Ersatzmechanik
    if(Date.now() - lastSlopeSeenTs > 6000){
      // Ersatz 1: leichter zufallsimpuls
      const r1 = (rand()*2 - 1) * (SLOPE_MAX_IMPULSE * 0.12);
      const r2 = (rand()*2 - 1) * (SLOPE_MAX_IMPULSE * 0.08);
      if(typeof window.SEEU?.applyImpulse === 'function') window.SEEU.applyImpulse(r1, r2);
      // Ersatz 2: trigger LemmingRoutine einmal
      if(typeof window.SEEU?.lemmingOnce === 'function') window.SEEU.lemmingOnce?.();
      // set cube busy briefly
      if(window.SEEU && typeof window.SEEU.setCubeState === 'function') window.SEEU.setCubeState('busy');
      lastSlopeSeenTs = Date.now(); // vermeide Dauerschleife
    }
  }, 2000);

  // wenn remote slope broadcast ankommt, handle
  try{
    const bc = new BroadcastChannel('seeu-presence');
    bc.onmessage = e => {
      const d = e.data;
      if(d && d.type === 'slope' && typeof d.slope === 'number') applyRemoteSlope(d.slope);
    };
  }catch(e){ /* ignore */ }

  // expose debug getters
  window.SEEU.getStorySlope = ()=> ({ raw: storySlopeRaw, smooth: storySlopeSmooth });

})();
