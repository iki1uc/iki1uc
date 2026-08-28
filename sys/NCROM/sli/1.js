// 1.js – Eingang (Ursache) – µ‑präzise Version
export function EINGANG(p, v, i) {

    // µ3 – atomare Achsen
    const preis = p;
    const volumen = v;
    const impuls = i;

    // µ3 – Summenachse (Ursache)
    const eingang = preis + volumen + impuls;

    // µ9 – vorbereitende Achsen (für STATION/WIRKUNG/AUSGANG)
    const pulse = (preis + volumen + impuls) % 9;
    const orbit = (preis * volumen * impuls) % 9;
    const drift = (preis - volumen + impuls) % 9;

    return {
        axis: "EINGANG",
        preis,
        volumen,
        impuls,
        eingang,

        // µ9 vorbereitende Achsen
        pulse,
        orbit,
        drift
    };
}
