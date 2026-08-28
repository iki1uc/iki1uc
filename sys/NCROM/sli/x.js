// x.js – Struktur (OI / IX / Eingang / Ursache)
export function X(p, v, i) {
    const OI = p + v;          // Öffnen
    const IX = v * i;          // Kreuzen
    const eingang = p + v + i; // Eingang
    const ursache = eingang;   // Ursache

    return {
        p, v, i,
        OI,
        IX,
        eingang,
        ursache
    };
}
