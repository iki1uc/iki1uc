// clone_cubes_auto.js — Vollautomatischer, fehlerfreier Cube‑Cloner
(function(){

  const ORIGINAL_KEY = 'Gegenteil_von_Muell';
  const TARGETS = [
    { id: 'iki', containerId: 'cubeWrap_iki' },
    { id: '1', containerId: 'cubeWrap_1' },
    { id: 'uc',  containerId: 'cubeWrap_uc' }
  ];

  function hashString(s){
    let h = 2166136261 >>> 0;
    for(let i=0;i<s.length;i++){
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function ensureDom(){
    TARGETS.forEach(t=>{
      if(!document.getElementById(t.containerId)){
        const wrap = document.createElement('div');
        wrap.id = t.containerId;
        wrap.style.minHeight = '140px';
        wrap.style.margin = '12px 0';
        wrap.style.border = '1px dashed rgba(0,0,0,0.15)';
        wrap.style.padding = '6px';
        wrap.style.borderRadius = '6px';
        wrap.style.fontSize = '12px';
        wrap.style.opacity = '0.8';
        wrap.textContent = `Container für ${t.id}`;
        document.body.appendChild(wrap);
      }
    });
  }

  function ensureOriginal(){
    window.SEEU_PROJECTS = window.SEEU_PROJECTS || {};
    if(!window.SEEU_PROJECTS[ORIGINAL_KEY]){
      window.SEEU_PROJECTS[ORIGINAL_KEY] = {
        prefix: ORIGINAL_KEY,
        chunksBase: 'wuerfel',
        rand: ()=>0.5
      };
      console.log('Originalwürfel automatisch registriert.');
    }
  }

  function autoClone(){
    if(typeof window.SEEU_CREATE_CUBE !== 'function'){
      console.warn('SEEU_CREATE_CUBE fehlt — lade remap.js / cube_sim.js zuerst.');
      return;
    }

    ensureDom();
    ensureOriginal();

    const ROOT = window.SEEU_PROJECTS;
    const original = ROOT[ORIGINAL_KEY];
    const baseSeed = hashString(original.prefix);

    window.SEEU_CLONES = window.SEEU_CLONES || {};

    TARGETS.forEach(t=>{
      if(window.SEEU_CLONES[t.id]){
        console.log(`Klon ${t.id} existiert bereits.`);
        return;
      }

      const seed = (baseSeed + hashString(t.id)) >>> 0;

      try{
        const inst = SEEU_CREATE_CUBE({
          projectId: t.id,
          seed: seed,
          containerId: t.containerId,
          chunksBase: t.id,
          version: 'v1'
        });

        window.SEEU_CLONES[t.id] = inst;
        console.log(`Klon erstellt: ${t.id} (seed=${seed})`);
      }catch(err){
        console.error(`Fehler beim Klonen von ${t.id}:`, err);
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', autoClone);
  } else {
    autoClone();
  }

})();
