export const MARKT_STATION = {
    preis(t) { return t.p; },
    volumen(t) { return t.v; },
    impuls(t) { return t.i; },

    wert(t) {
        return t.p * t.v * t.i;
    },

    station(t) {
        return {
            axis: "MARKT",
            preis: this.preis(t),
            volumen: this.volumen(t),
            impuls: this.impuls(t),
            wert: this.wert(t)
        };
    }
};
