document.addEventListener("DOMContentLoaded", async () => {

  const stations = [
    "./Master-Kern/MASTER-SCANNER.html",
    "./Master-Kern/system-check.item",
    "./ID.html",
    "./modules/Trinity/index.html",
    "./modules/tri5mix/index.html",
    "./modules/grundsystem1.0/index.html",
    "./modules/SEEÜ/index.html",
    "./modules/RESPO/index.html",
    "./modules/NC.link/index.html",
    "./visual/LAGE.html",
    "./visual/Orbit.html",
    "./visual/Identity.html"
  ];

  const statusBox = document.getElementById("station-status");

  for (const path of stations) {
    try {
      const res = await fetch(path);

      if (!res.ok) {
        statusBox.innerHTML += `❌ ${path} → missing<br>`;
      } else {
        statusBox.innerHTML += `✔ ${path} → ok<br>`;
      }

    } catch (e) {
      statusBox.innerHTML += `❌ ${path} → error<br>`;
    }
  }
});
