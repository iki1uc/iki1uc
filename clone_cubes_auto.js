// clone_cubes_auto.js
(function(){
  // Konfiguration: Originalname und gewünschte Klon‑IDs
  const ORIGINAL_KEY = 'Gegenteil_von_Muell'; // Name der Original‑Instanz in SEEU_PROJECTS
  const TARGETS = [
    { id: 'iki', containerId: 'cubeWrap_iki' },
    { id: 'one', containerId: 'cubeWrap_1' },
    { id: 'uc', containerId: 'cubeWrap_uc' }
  ];
  // Utility: deterministischer String‑Hash -> 32bit int
  function hashString(s){
    let h = 2166136261 >>> 0;
    for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  // Safety: prüfe Factory
  if(typeof window.SEEU_CREATE_CUBE !== 'function'){
    console.warn('SEEU_CREATE_CUBE nicht gefunden. Automatisches Klonen abgebrochen.');
    return;
  }
  // Warte auf DOM
  function ensureDomAndRun(){
    try{
      // Erzeuge Container falls nötig
      TARGETS.forEach(t=>{
        if(!document.getElementById(t.containerId)){
          const wrap = document.createElement('div');
          wrap.id = t.containerId;
          // optional: minimal styling, kann entfernt werden
          wrap.style.minHeight = '140px';
          wrap.style.margin = '8px 0';
          document.body.appendChild(wrap);
        }
      });

      // Original prüfen (falls registriert)
      const ROOT = window.SEEU_PROJECTS || {};
      const original = ROOT[ORIGINAL_KEY];

      // Basisseed: aus Original wenn möglich, sonst aus Originalname
      let baseSeed = original && original.prefix ? hashString(original.prefix) : hashString(ORIGINAL_KEY);

      // Idempotent: existierende Klone nicht neu erstellen
      window.SEEU_CLONES = window.SEEU_CLONES || {};

      TARGETS.forEach(t=>{
        if(window.SEEU_CLONES[t.id]) {
          console.log(`Klon ${t.id} existiert bereits — übersprungen.`);
          return;
        }
        const seed = (baseSeed + hashString(t.id)) >>> 0;
        try{
          const inst = SEEU_CREATE_CUBE({
            projectId: t.id,
            seed: seed,
            containerId: t.containerId,
            chunksBase: (original && original.chunksBase) ? original.chunksBase : t.id,
            version: 'v1'
          });
          // optional: initiale sanfte Konfiguration
          try{ inst.setMode && inst.setMode('online'); }catch(e){}
          // registrieren
          window.SEEU_CLONES[t.id] = inst;
          console.log(`Klon erstellt: ${t.id} (seed=${seed}) in #${t.containerId}`);
        }catch(err){
          console.error(`Fehler beim Erstellen von ${t.id}:`, err);
        }
      });

      // Optional: Start‑Routine (kleine Impulse, nur sichtbar)
      Object.values(window.SEEU_CLONES).forEach(inst=>{
        try{
          inst.broadcast && inst.broadcast({ type:'clone_init', note:'automated', ts:Date.now() });
          // kleiner Impuls zur Sichtprüfung
          inst.applyImpulse && inst.applyImpulse((Math.random()-0.5)*0.04,(Math.random()-0.5)*0.03);
        }catch(e){}
      });

      console.log('Automatisches Klonen abgeschlossen. Zugriff: window.SEEU_CLONES');
    }catch(e){
      console.error('Automatisches Klonen fehlgeschlagen:', e);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureDomAndRun);
  else ensureDomAndRun();

  // Expose helper: safe destroy all clones
  window.SEEU_CLONES_DESTROY_ALL = function(){
    if(!window.SEEU_CLONES) return;
    Object.keys(window.SEEU_CLONES).forEach(k=>{
      try{ window.SEEU_CLONES[k].destroy(); }catch(e){}
      delete window.SEEU_CLONES[k];
    });
    console.log('Alle Klone zerstört.');
  };
})();

