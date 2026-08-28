// 3.js – µ‑präzise Wirkung (Impuls)
export function WIRKUNG(station) {

    // µ9: Pulse / Orbit / Drift aus station.wert
    const p = station.wert;
    const v = p % 9;
    const i = (p * v) % 9;

    const pulse = (p + v + i) % 9;
    const orbit = (p * v * i) % 9;
    const drift = (p - v + i) % 9;

    // µ9: deterministischer Impact
    const impact = pulse + orbit + drift;

    // µ81: Wirkung als Clusterwert
    const wirkung = p * impact;

    return {
        ...station,

        // µ9 Achsen
        pulse,
        orbit,
        drift,
        impact,

        // µ81 Clusterwert
        wirkung
    };
}
