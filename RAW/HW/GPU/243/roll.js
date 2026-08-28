// 243 · Roll-System Loader

import run100 from "./100.js";
import run150 from "./150.js";
import run200 from "./200.js";
import run50 from "./50.js";

// Saubere, klare Zuordnung
window.run243 = {
    basic: run100,   // Basis-Runtime
    opt: run150,     // Optimierte Runtime
    safe: run200,    // Fehlergeschützte Runtime
    multi: run50     // Multi-Station Runtime
};
