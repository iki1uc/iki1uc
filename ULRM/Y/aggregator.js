// ============================================================
// IKI1UC · RUN21 · Aggregaomatichtender Operator
// Axiom‑4 · Borg‑Kern · Meta‑Aggregator
// ============================================================

export const Aggregator = {

  pools: ["api", "markt", "ort", "pipeline", "engine", "basis", "analyse", "raum"],
  modules: [],
  status: {},

  async init() {
    console.log("RUN21 · Aggregator gestartet");
    await this.scanPools();
    this.aggregate();
    this.render();
  },

  async scanPools() {
    for (const pool of this.pools) {
      const list = await this.scanPool(pool);
      this.modules.push(...list);
    }
  },

  async scanPool(pool) {
    try {
      const res = await fetch(`${pool}/status.json`);
      const data = await res.json();
      return data.modules.map(m => ({ ...m, pool }));
    } catch {
      return [{ name:`${pool}`, path:`${pool}/`, status:"offline", pool }];
    }
  },

  aggregate() {
    this.status = {
      fire:  this.modules.filter(m => m.category === "fire"),
      ice:   this.modules.filter(m => m.category === "ice"),
      ort:   this.modules.filter(m => m.category === "ort"),
      raw:   this.modules.filter(m => m.name.includes("raw")),
      rom:   this.modules.filter(m => m.name.includes("rom")),
      ram:   this.modules.filter(m => m.name.includes("ram")),
      cpu:   this.modules.filter(m => m.name.includes("cpu")),
      gpu:   this.modules.filter(m => m.name.includes("gpu")),
      nc:    this.modules.filter(m => m.name.includes("NC.room")),
      quant: this.modules.filter(m => m.name.includes("quant")),
      cont:  this.modules.filter(m => m.name.includes("continuum")),
      tmp:   this.modules.filter(m => m.name.includes("TMP")),
      anker: this.modules.filter(m => m.name.includes("ANKER")),
    };
  },

  render() {
    console.log("=== RUN21 · Aggregaomatichtender Übersicht ===");
    console.log("🔥 FIRE:", this.status.fire.length);
    console.log("❄️ ICE:", this.status.ice.length);
    console.log("🌍 ORT:", this.status.ort.length);
    console.log("💾 RAW:", this.status.raw.length);
    console.log("📀 ROM:", this.status.rom.length);
    console.log("📚 RAM:", this.status.ram.length);
    console.log("🧠 CPU:", this.status.cpu.length);
    console.log("🎨 GPU:", this.status.gpu.length);
    console.log("🏛 NC.room:", this.status.nc.length);
    console.log("🔺 quant‑triangle:", this.status.quant.length);
    console.log("🌀 continuum:", this.status.cont.length);
    console.log("💨 TMP:", this.status.tmp.length);
    console.log("⚓ ANKER:", this.status.anker.length);
  }
};

Aggregator.init();
