// 2.js – Station (Wert)
export function STATION(eingang) {
    const wert = eingang.preis * eingang.volumen * eingang.impuls;

    return {
        axis: "STATION",
        ...eingang,
        wert
    };
}

