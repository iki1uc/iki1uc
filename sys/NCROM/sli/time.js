// stand.js – iki1uc Markt-Stand (NCROM / Pulse / Orbit / Drift)
import { NCROM } from "../NCROM/rom.mode.js";

export function STAND(markt, commander) {

    // Grundwerte aus Markt
    const preis   = markt.preis;
    const volumen = markt.volumen;
    const impuls  = markt.impuls;
    const wert    = markt.wert;

    // Commander-Impact
    const impact  = commander.impact;

    // NCROM Pulse / Orbit / Drift
    const pulse = (preis + volumen + impuls) % 9;
    const orbit = (preis * volumen * impuls) % 9;
    const drift = (wert - impuls + volumen) % 9;

    // Echo-Hall / Synapsen-Follow
    const echo    = `${pulse}:${orbit}:${drift}`;
    const synapse = (pulse + orbit + drift) % 9;

    // Finaler Stand-Wert
    const stand = (wert * impact) + pulse + orbit + drift + synapse;

    return {
        origin: NCROM.origin,
        state: NCROM.state,
        expand: NCROM.expand,

        preis,
        volumen,
        impuls,
        wert,

        impact,

        pulse,
        orbit,
        drift,

        echo,
        synapse,

        stand
    };
}
