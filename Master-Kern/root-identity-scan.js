document.addEventListener("DOMContentLoaded", async () => {

  const idPaths = [
    "./ID.html",
    "./modules/Trinity/index.html",
    "./modules/tri5mix/index.html"
  ];

  const box = document.getElementById("identity-status");

  for (const p of idPaths) {
    try {
      const res = await fetch(p);
      box.innerHTML += res.ok
        ? `✔ ID: ${p} → ok\n`
        : `❌ ID: ${p} → missing\n`;
    } catch {
      box.innerHTML += `❌ ID: ${p} → error\n`;
    }
  }
});
