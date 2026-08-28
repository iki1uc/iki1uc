// 4.js – Ausgang (Ergebnis)
export function AUSGANG(wirkung) {
    const ausgang = wirkung.wirkung / wirkung.eingang;

    return {
        ...wirkung,
        ausgang,
        gs6: ausgang // Goldener Schnitt (6)
    };
}

