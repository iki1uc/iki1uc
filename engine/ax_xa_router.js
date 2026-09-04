// =====================================================
// IKI1UC · RUN21 · AX_XA_ROUTER
// Ausführender Organ (OOBS)
// =====================================================

export const AX_XA_ROUTER = {

  async init() {
    console.log("RUN21 · Organ startet…");

    await this.rawator();
    await this.engine();
    await this.pipeline();
    await this.room();
    await this.sys();
    await this.continuum();
    await this.root();

    console.log("RUN21 · Organ vollständig aktiv.");

    // ────────────────────────────────────────────────
    // Jetzt wird dein RAWATOR-Schluss ausgeführt
    // ────────────────────────────────────────────────

    if (window.updateUI) updateUI();
    if (window.log) {
      log('🧬 RAWATOR · 🧲 MAGNETO · COCKPIT · KRÜMMUNGSANTRIEB geladen', 'ok');
      log('⌨️  space=Magneto  o=Orbit  s=Suite  a=Admin0  n=Narrativ  p=Pulse  x=Reset  v=Vital  h=Hologramm', 'ok');
    }

    if (window.rawatorOut) {
      rawatorOut.textContent =
        '🧬 RAWATOR · 🧲 MAGNETO · KRÜMMUNGSANTRIEB · 81-HOLOGRAMM · BEREIT';
    }

    if (window.narrativContent) {
      narrativContent.textContent =
        '🌀 Deep Space Nine · Continuum offen · Krümmungsantrieb aktiv · GS6';
    }

    console.log('🧬 RAWATOR · 🧲 MAGNETO · COCKPIT · KRÜMMUNGSANTRIEB');
    console.log('⌨️  space=Magneto  o=Orbit  s=Suite  a=Admin0  n=Narrativ  p=Pulse  x=Reset  v=Vital  h=Hologramm');
    console.log('🌀 "Der Krümmungsantrieb ist aktiviert." – Ridvan · Only 4U');

    // Auto-Start übernehmen
    setTimeout(() => {
      if (window.MAGNETO) MAGNETO.running = true;
      if (window.updateUI) updateUI();
      if (window.log) log('▶ AUTO-START · System aktiv', 'ok');
      if (window.toggleAuto) toggleAuto();
    }, 1000);
  },

  async rawator() {
    try {
      const raw = await import("./RAWATOR.js");
      window.RAWATOR = raw.RAWATOR;
      RAWATOR.init();
      console.log("RAWATOR geladen.");
    } catch (e) { console.warn("RAWATOR Fehler:", e); }
  },

  async engine() {
    try {
      const engine = await import("./engine.js");
      if (engine.start) engine.start();
      console.log("Engine aktiv.");
    } catch (e) { console.warn("Engine Fehler:", e); }
  },

  async pipeline() {
    try {
      const suite = await import("../pipeline/suite.js");
      if (suite.run) suite.run();
      console.log("Pipeline Suite aktiv.");
    } catch (e) { console.warn("Pipeline Fehler:", e); }
  },

  async room() {
    try {
      const room = await import("../room.js");
      if (room.open) room.open();
      console.log("Room geöffnet.");
    } catch (e) { console.warn("Room Fehler:", e); }
  },

  async sys() {
    try {
      await import("../sys/triangle.sys");
      await import("../sys/quad.tem");
      console.log("SYS‑Matrix geladen.");
    } catch (e) { console.warn("SYS Fehler:", e); }
  },

  async continuum() {
    try {
      const cont = await fetch("../space/continuum-reality.json").then(r => r.json());
      window.CONTINUUM = cont;
      console.log("Continuum geladen.");
    } catch (e) { console.warn("Continuum Fehler:", e); }
  },

  async root() {
    try {
      const scan = await import("../root-scan.js");
      if (scan.run) scan.run();
      console.log("ROOT‑Scan aktiv.");
    } catch (e) { console.warn("ROOT Fehler:", e); }
  }
};
