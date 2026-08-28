// q.js – iki1uc Meta-Bindung (NCROM / Pulse / Orbit / Drift)
import { NCROM } from "../NCROM/rom.mode.js";

export function Q(meta) {

    return {

        // Meta-Wert
        q: meta,

        // Bindung zwischen X und Y
        bind(x, y) {
            const base = (x * y) + meta;

            // NCROM Pulse / Orbit / Drift
            const pulse = (x + y + meta) % 9;
            const orbit = (x * y * meta) % 9;
            const drift = (x - y + meta) % 9;

            // Echo-Hall / Synapsen-Follow
            const echo = `${pulse}:${orbit}:${drift}`;
            const synapse = (pulse + orbit + drift) % 9;

            // Finaler Bindungswert
            const bindValue = base + pulse + orbit + drift + synapse;

            return {
                origin: NCROM.origin,
                state: NCROM.state,
                expand: NCROM.expand,

                x,
                y,
                meta,

                pulse,
                orbit,
                drift,

                echo,
                synapse,

                bind: bindValue
            };
        }
    };
}
