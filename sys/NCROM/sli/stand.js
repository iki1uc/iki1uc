// MARKT_STATION – iki1uc Marktstation (NCROM / Pulse / Orbit / Drift)
import { NCROM } from "../NCROM/rom.mode.js";

export const MARKT_STATION = {

    preis(t) {
        return t.p;
    },

    volumen(t) {
        return t.v;
    },

    impuls(t) {
        return t.i;
    },

    // Axiomische Wertberechnung
    wert(t) {
        return t.p * t.v * t.i;
    },

    // Pulse / Orbit / Drift aus Marktwerten
    pulse(t) {
        return (t.p + t.v + t.i) % 9;
    },

    orbit(t) {
        return (t.p * t.v * t.i) % 9;
    },

    drift(t) {
        return (t.p - t.v + t.i) % 9;
    },

    // Echo-Hall / Synapsen-Follow
    echo(t) {
        return `${this.pulse(t)}:${this.orbit(t)}:${this.drift(t)}`;
    },

    synapse(t) {
        return (this.pulse(t) + this.orbit(t) + this.drift(t)) % 9;
    },

    // Finalisierte Station
    station(t) {
        return {
            axis: "MARKT",

            origin: NCROM.origin,
            state: NCROM.state,
            expand: NCROM.expand,

            preis: this.preis(t),
            volumen: this.volumen(t),
            impuls: this.impuls(t),
            wert: this.wert(t),

            pulse: this.pulse(t),
            orbit: this.orbit(t),
            drift: this.drift(t),

            echo: this.echo(t),
            synapse: this.synapse(t),

            // Finaler iki1uc-Marktwert
            stand: this.wert(t)
                 + this.pulse(t)
                 + this.orbit(t)
                 + this.drift(t)
                 + this.synapse(t)
        };
    }
};
