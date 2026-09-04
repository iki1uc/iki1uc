// =====================================================
// IKI1UC · RUN21 · AX_XA_ROUTER
// Ausführender Organ (OOBS)
// =====================================================

export const AX_XA_ROUTER = {

  async init() {
    console.log("RUN21 · AX_XA_ROUTER · Organ startet…");

    await this.root();
    await this.engine();
    await this.pipeline();
    await this.room();
    await this.sys();
    await this.respo();
    await this.space();

    console.log("RUN21 · Organ vollständig aktiv.");
  },

  async root() {
    try {
      const scan = await import("../root-scan.js");
      if (scan.run) scan.run();
      console.log("ROOT‑Scan aktiv.");
    } catch (e) { console.warn("ROOT Fehler:", e); }
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
      const tri = await import("../sys/triangle.sys");
      const quad = await import("../sys/quad.tem");
      console.log("SYS‑Matrix geladen.");
    } catch (e) { console.warn("SYS Fehler:", e); }
  },

  async respo() {
    try {
      const motor = await import("../respo/respo.motor.index.html");
      console.log("RESPO‑Motor aktiv.");
    } catch (e) { console.warn("RESPO Fehler:", e); }
  },

  async space() {
    try {
      const cont = await import("../space/continuum-reality.json");
      console.log("Continuum geladen.");
    } catch (e) { console.warn("Continuum Fehler:", e); }
  }
};
