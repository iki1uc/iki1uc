// 2.js – STATION µ81 (iki1uc-kompatibel)

// µ81 Cluster-Matrix importieren
import { VEC81 } from "./API.system.js";

// µ9 Transformation
function transform9(wert) {
    const p = wert;
    const v = p % 9;
    const i = (p * v) % 9;

    return {
        pulse: (p + v + i) % 9,
        orbit: (p * v * i) % 9,
        drift: (p - v + i) % 9
    };
}

// µ81 Eintrag
function insert81(entry) {
    const index = VEC81.trades.findIndex(t => t === null);
    if (index === -1) return false;      // µ81 voll
    VEC81.trades[index] = entry;
    return true;
}

// --- STATION µ81 ---
export function STATION(eingang) {

    // µ1/µ2/µ3 sind NICHT Teil der Station, sondern des VEC-Systems
    const wert = eingang.preis * eingang.volumen * eingang.impuls;

    // µ9 Transformation
    const { pulse, orbit, drift } = transform9(wert);

    // µ81 Cluster-Eintrag
    const cluster = {
        axis: "STATION",
        ...eingang,
        wert,
        pulse,
        orbit,
        drift
    };

    insert81(cluster);

    return cluster;
}
