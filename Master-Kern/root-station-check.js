document.addEventListener("DOMContentLoaded", async () => {

  const paths = [
    "./Master-Kern/MASTER-SCANNER.html",
    "./Master-Kern/system-check.item",
    "./Master-Kern/LAGE-CODE-FINAL.nc",
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

  const box = document.getElementById("station-status");

  for (const p of paths) {
    try {
      const res = await fetch(p);

      if (!res.ok) {
        box.innerHTML += `❌ ${p} → missing<br>`;
      } else {
        box.innerHTML += `✔ ${p} → ok<br>`;
      }

    } catch {
      box.innerHTML += `❌ ${p} → error<br>`;
    }
  }
});
