document.addEventListener("DOMContentLoaded", async () => {

  const paths = [
    "./visual/Orbit.html",
    "./visual/LAGE.html",
    "./visual/Identity.html"
  ];

  const box = document.getElementById("orbit-status");

  for (const p of paths) {
    try {
      const res = await fetch(p);
      box.innerHTML += res.ok
        ? `✔ ORBIT: ${p} → ok\n`
        : `❌ ORBIT: ${p} → missing\n`;
    } catch {
      box.innerHTML += `❌ ORBIT: ${p} → error\n`;
    }
  }
});
