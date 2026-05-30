// --- seeu_engine.js ---
// Minimale funktionierende Cube-Engine für dein System

window.SEEU = window.SEEU || {};

// Projekt-Registry
window.SEEU_PROJECTS = window.SEEU_PROJECTS || {};
window.SEEU_CLONES = window.SEEU_CLONES || {};

// Hauptfunktion: Cube erzeugen
window.SEEU_CREATE_CUBE = function(opts){
  const {
    projectId,
    seed,
    containerId,
    chunksBase,
    version
  } = opts;

  const container = document.getElementById(containerId);
  if(!container){
    console.error("Container fehlt:", containerId);
    return null;
  }

  // Cube-Element erzeugen
  const cube = document.createElement("div");
  cube.className = "cube state-online";
  cube.style.transform = "rotateX(0deg) rotateY(0deg)";

  // Faces erzeugen
  const faces = window.SEEU_BUILD_FACES(projectId);
  faces.forEach(f => cube.appendChild(f));

  // In Container setzen
  container.innerHTML = "";
  container.appendChild(cube);

  // Instanz-Objekt
  const inst = {
    id: projectId,
    seed,
    container,
    cube,
    rotX: 0,
    rotY: 0,

    applyImpulse(ix, iy){
      this.rotX += iy * 40;
      this.rotY += ix * 40;
      cube.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
    },

    setState(state){
      cube.classList.remove("state-online","state-busy","state-offline");
      cube.classList.add(`state-${state}`);
    }
  };

  // Globale API verbinden
  window.SEEU.applyImpulse = (x,y)=> inst.applyImpulse(x,y);
  window.SEEU.setCubeState = (s)=> inst.setState(s);

  console.log("Cube erzeugt:", projectId);
  return inst;
};

