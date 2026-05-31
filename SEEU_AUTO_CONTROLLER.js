// --- SEEU_AUTO_CONTROLLER.js ---
// Vollständiges AUTO-Molekül für alle Cube-Instanzen
// Kompletter Neuaufbau: keine Überschreibungen, keine Drift

window.SEEU = window.SEEU || {};
window.SEEU_CLONES = window.SEEU_CLONES || [];

// ---------------------------------------------------------
// CLONE REGISTRIERUNG
// ---------------------------------------------------------
window.SEEU_REGISTER_CLONE = function(inst){
  if(!inst) return;
  window.SEEU_CLONES.push(inst);
  console.log("SEEU: Clone registriert:", inst.id);
};

// ---------------------------------------------------------
// AUTO: IMPULSE AN ALLE CLONES
// ---------------------------------------------------------
window.SEEU_AUTO_IMPULSE = function(ix, iy){
  window.SEEU_CLONES.forEach(c=>{
    if(c.applyImpulse){
      c.applyImpulse(ix, iy);
    }
  });
  console.log("SEEU: AUTO-Impulse verteilt:", ix, iy);
};

// ---------------------------------------------------------
// AUTO: STATE AN ALLE CLONES
// ---------------------------------------------------------
window.SEEU_AUTO_STATE = function(state){
  window.SEEU_CLONES.forEach(c=>{
    if(c.setState){
      c.setState(state);
    }
  });
  console.log("SEEU: AUTO-State gesetzt:", state);
};

// ---------------------------------------------------------
// AUTO: STORY-TRIGGER (optional)
// ---------------------------------------------------------
window.SEEU_AUTO_STORY = function(trigger){
  window.SEEU_CLONES.forEach(c=>{
    if(c.triggerStory){
      c.triggerStory(trigger);
    }
  });
  console.log("SEEU: AUTO-Story-Trigger:", trigger);
};

// ---------------------------------------------------------
// AUTO: SYNC (Rotation angleichen)
// ---------------------------------------------------------
window.SEEU_AUTO_SYNC = function(){
  if(window.SEEU_CLONES.length < 2) return;

  const ref = window.SEEU_CLONES[0];

  window.SEEU_CLONES.forEach(c=>{
    if(c !== ref){
      c.rotX = ref.rotX;
      c.rotY = ref.rotY;
      c.cube.style.transform =
        `rotateX(${c.rotX}deg) rotateY(${c.rotY}deg)`;
    }
  });

  console.log("SEEU: AUTO-Sync durchgeführt");
};

console.log("SEEU_AUTO_CONTROLLER.js geladen");

