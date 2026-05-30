// --- cube_loader.js ---
// Minimaler Loader für Projekte

window.SEEU_REGISTER_PROJECT = function(id, data){
  window.SEEU_PROJECTS[id] = data;
  console.log("Projekt registriert:", id);
};

