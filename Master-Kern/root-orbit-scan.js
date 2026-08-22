document.addEventListener("DOMContentLoaded", async () => {

  const paths = [
    "./visual/Orbit.html",
    "./visual/LAGE.html",
    "./visual/Identity.html"
  ];

  const box = document.getElementById("orbit-status");

  // MASTER-KERN: CACHE
  const CACHE = {
    load: 0,
    max: 360,
    add(x) {
      this.load += x;
      if (this.load > this.max) this.load = this.max;
    },
    status() {
      if (this.load < 120) return "STABIL";
      if (this.load < 360) return "HOCH";
      return "VOLL";
    }
  };

  // ERROR-ROUTER
  const ERROR_ROUTER = (path, reason) => {
    const target =
      "./error.root.html?path=" + encodeURIComponent(path) +
      "&reason=" + encodeURIComponent(reason) +
      "&cache=" + CACHE.status();
    window.location.href = target;
  };

  for (const p of paths) {
    try {
      const res = await fetch(p);

      CACHE.add(36); // jeder ORBIT-Scan erhöht Cache

      if (res.ok) {
        box.innerHTML += `✔ ORBIT: ${p} → ok\n`;
      } else {
        box.innerHTML += `❌ ORBIT: ${p} → missing\n`;
        ERROR_ROUTER(p, "missing");
        return;
      }

    } catch {
      box.innerHTML += `❌ ORBIT: ${p} → error\n`;
      ERROR_ROUTER(p, "exception");
      return;
    }
  }
});
