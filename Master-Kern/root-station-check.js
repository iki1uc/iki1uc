document.addEventListener("DOMContentLoaded", async () => {

  const paths = [
    "./RESPO-Name/index.html",
    "./RESPO-Station/index.html",
    "./RESPO.Ort-LAGE/index.html",
    "./RESPO-Beam-Point/index.html",
    "./RESPO-Code-Pipeline/index.html"
  ];

  const box = document.getElementById("respo-status");

  // RESPO-AXIOM (81)
  const AXIOM = 81;

  // RESPO-MATRIX (692)
  const MATRIX = 692;

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
      "&cache=" + CACHE.status() +
      "&axiom=" + AXIOM +
      "&matrix=" + MATRIX;
    window.location.href = target;
  };

  for (const p of paths) {
    try {
      const res = await fetch(p);

      CACHE.add(81); // RESPO-AXIOM erhöht Cache

      if (res.ok) {
        box.innerHTML += `✔ RESPO: ${p} → ok\n`;
      } else {
        box.innerHTML += `❌ RESPO: ${p} → missing\n`;
        ERROR_ROUTER(p, "missing");
        return;
      }

    } catch {
      box.innerHTML += `❌ RESPO: ${p} → error\n`;
      ERROR_ROUTER(p, "exception");
      return;
    }
  }

  // AXIOM + MATRIX anzeigen
  box.innerHTML += `\nAXIOM: ${AXIOM} → aktiv\n`;
  box.innerHTML += `MATRIX: ${MATRIX} → bereit\n`;
});
