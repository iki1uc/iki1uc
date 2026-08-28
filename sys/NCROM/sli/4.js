// 4.js – µ‑präziser Ausgang (Ergebnis)
export function AUSGANG(wirkung) {

    // µ9: Pulse / Orbit / Drift aus Eingangsgrößen
    const p = wirkung.eingang;
    const v = wirkung.wirkung;
    const i = (p * v) % 9;

    const pulse = (p + v + i) % 9;
    const orbit = (p * v * i) % 9;
    const drift = (p - v + i) % 9;

    // µ81: Ausgangscluster
    const ausgang = (v / p) + pulse + orbit + drift;

    return {
        ...wirkung,

        // µ9 Achsen
        pulse,
        orbit,
        drift,

        // µ81 Clusterwert
        ausgang,

        // GS6 = Verhältnis + µ9‑Achsen
        gs6: ausgang
    };
}
