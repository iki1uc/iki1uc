// y.js – Bewegung (IO / XI / Ausgang / Wirkung)
export function Y(p, v, i) {
    const IO = p * i;          // Drehen
    const XI = v + i;          // Schließen
    const ausgang = IO + XI;   // Ausgang
    const wirkung = ausgang;   // Wirkung

    return {
        p, v, i,
        IO,
        XI,
        ausgang,
        wirkung
    };
}
