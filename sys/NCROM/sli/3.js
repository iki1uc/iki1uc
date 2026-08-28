// 3.js – Wirkung (Impuls)
export function WIRKUNG(station) {
    const impact = Math.random();

    return {
        ...station,
        impact,
        wirkung: station.wert * impact
    };
}

