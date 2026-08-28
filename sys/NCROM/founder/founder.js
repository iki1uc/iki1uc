export const FOUNDER = {
  mode: "ROOT",
  active: true,
  ultra: true,
  dimension: "NC6",

  axes: 756,

  satellites: {
    super: 729,
    orbit: 81,
    kernel: 9,
    ur: 3
  },

  atmosphere: {
    O2: 0.21,
    CO2: 0.0004,
    H2O: 0.01,
    GAS: 0.78,
    NEBEL: 0.00
  },

  commands: {
    ATTACK: "6D-ATTACK",
    STEP: "3→9→27→81→243→729",
    PIPELINEBLITZ: "ALL-6-RUNS",
    RUN3: "RIGHT-AXIS",
    BEAM: "729-BEAM",
    HOLO: "HOLOGRAM-TOGGLE",
    RESPO: "REFLEX-MATRIX",
    DS9: "DEEP-SPACE-ANCHOR",
    ORG: "SORT-SATELLITES",
    REORG: "MIX-SATELLITES",
    RESET: "ROOT-RETURN"
  },

  status: {
    satellites_rising: false,
    engine_rising: false,
    atmosphere_shift: false
  }
};
