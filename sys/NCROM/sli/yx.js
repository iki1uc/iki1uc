// yx.js – iki1uc Meta-Universum Engine
import { NCROM } from "../NCROM/rom.mode.js";

export function YX(x, y, q) {

    // X/Y Cache einlesen
    const cacheX = NCROM.core.cache.x;
    const cacheY = NCROM.core.cache.y;

    // Pulse / Orbit / Drift berechnen
    const pulse = (x + y + q) % 9;
    const orbit = (x * y * q) % 9;
    const drift = (x - y + q) % 9;

    // Echo-Hall / Synapsen-Follow
    const echo = `${pulse}:${orbit}:${drift}`;
    const synapse = (pulse + orbit + drift) % 9;

    return {
        origin: NCROM.origin,
        state: NCROM.state,
        expand: NCROM.expand,

        cacheX,
        cacheY,

        x,
        y,
        q,

        pulse,
        orbit,
        drift,

        echo,
        synapse,

        // Meta-Fraktal
        meta: {
            fractal: NCROM.meta.fractal,
            source: NCROM.meta.source,
            value: (pulse * orbit) + drift
        },

        // Raum-Fraktal
        space: {
            matrix: NCROM.space.matrix.cache,
            source: NCROM.space.source.cache
        },

        // Finaler YX-Wert
        yx: (x * y) + q + pulse + orbit + drift + synapse
    };
}
