// --- cube_faces.js ---
// erzeugt 6 einfache Cube-Faces

window.SEEU_BUILD_FACES = function(projectId){
  const names = ["front","back","left","right","top","bottom"];
  const faces = [];

  names.forEach(name=>{
    const f = document.createElement("div");
    f.className = "face";
    f.textContent = projectId + " – " + name;

    // Positionen
    if(name==="front")  f.style.transform = "translateZ(70px)";
    if(name==="back")   f.style.transform = "rotateY(180deg) translateZ(70px)";
    if(name==="left")   f.style.transform = "rotateY(-90deg) translateZ(70px)";
    if(name==="right")  f.style.transform = "rotateY(90deg) translateZ(70px)";
    if(name==="top")    f.style.transform = "rotateX(90deg) translateZ(70px)";
    if(name==="bottom") f.style.transform = "rotateX(-90deg) translateZ(70px)";

    faces.push(f);
  });

  return faces;
};
