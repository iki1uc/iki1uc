// ------------------------------------------------------
// phi.js – Industrie‑6.0 Phi‑Modul
// ------------------------------------------------------

// 1) Phi‑Generator (Fibonacci)
export const PHI = {
    a: 1,
    b: 1,

    next(){
        const n = this.a + this.b;
        this.a = this.b;
        this.b = n;
        return n;
    },

    ratio(){
        return this.b / this.a;
    },

    reset(){
        this.a = 1;
        this.b = 1;
    }
};

// ------------------------------------------------------
// 2) Bewertungs‑Kern (universell)
// ------------------------------------------------------
export function RATE(achse, wert, norm){
    return {
        achse,
        wert,
        norm,
        delta: wert - norm,
        status:
            wert === norm ? "Norm" :
            wert > norm && wert < norm * 3 ? "Übernorm" :
            wert >= norm * 3 ? "Extrem" :
            "Unternorm"
    };
}

// ------------------------------------------------------
// 3) Phi‑Bewertung
// ------------------------------------------------------
export function RATE_PHI(){
    const r = PHI.ratio();
    return RATE("Phi‑Ratio", r, 1.618);
}

// ------------------------------------------------------
// 4) Phi‑Ausführung + Bewertung
// ------------------------------------------------------
export function runPhi(){
    const n = PHI.next();
    const rating = RATE_PHI();

    return {
        value: n,
        ratio: PHI.ratio(),
        rating
    };
}
