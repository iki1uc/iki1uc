// NCROM / Markt / Axiomatik – iki1uc

export const AXIOMIAT = {
  SET: {
    family: ["AH", "HA", "ÄH", "HÄ"],   // µ4 Axiom-Familie
    center: "NC",                      // Nucleus Center
    note: "Stammform. Vorläufig. Erweiterbar.",

    // µ1/µ2/µ3 – Winterschlaf-Zustand
    active: false,
    state: "idle",
    passage: false,

    // µ9 – deaktiviert
    pulse: 0,
    orbit: 0,
    drift: 0,
    rating: 0,
    route: null,
    trade: null,

    // µ81 – leer
    cluster: Array(81).fill(null)
  }
};
