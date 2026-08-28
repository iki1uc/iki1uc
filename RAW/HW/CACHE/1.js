// 1.js – Eingang (Ursache)
export function EINGANG(p, v, i) {
    return {
        preis: p,
        volumen: v,
        impuls: i,
        eingang: p + v + i
    };
}

