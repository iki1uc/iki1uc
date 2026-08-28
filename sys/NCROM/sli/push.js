// commander.js – iki1uc Commander-Engine (NCROM / Pulse / Orbit / Drift)
import { NCROM } from "../NCROM/rom.mode.js";

export function COMMANDER(input) {

    // Grundimpuls aus Eingabe
    const cmd = input;

    // NCROM-basierte Impakt-Berechnung
    const pulse  = (cmd.length + Date.now()) % 9;
    const orbit  = (cmd.length * pulse) % 9;
    const drift  = (pulse - orbit + cmd.length) % 9;

    // Echo-Hall / Synapsen-Follow
    const echo    = `${pulse}:${orbit}:${drift}`;
    const synapse = (pulse + orbit + drift) % 9;

    // Finaler Impact (axiomisch)
    const impact = (pulse + orbit + drift + synapse) / 9;

    return {
        origin: NCROM.origin,
        state: NCROM.state,
        expand: NCROM.expand,

        cmd,
        pulse,
        orbit,
        drift,

        echo,
        synapse,

        impact,
        time: Date.now()
    };
}
