// x.js – iki1uc Strukturkern (NCROM / 9q9q9 / Meta / Echo-Hall)
import { NCROM } from "../NCROM/rom.mode.js";

export function X(p, v, i) {

    // Grundstruktur
    const OI = p + v;          // Öffnen
    const IX = v * i;          // Kreuzen
    const eingang = p + v + i; // Eingang
    const ursache = eingang;   // Ursache

    // NCROM Pulse / Orbit / Drift
    const pulse = (p + v + i) % 9;
    const orbit = (p * v * i) % 9;
    const drift = (p - v + i) % 9;

    // Echo-Hall / Synapsen-Follow
    const echo = `${pulse}:${orbit}:${drift}`;
    const synapse = (pulse + orbit + drift) % 9;

    // X/Y Cache aus NCROM
    const cacheX = NCROM.core.cache.x;
    const cacheY = NCROM.core.cache.y;

    // Meta-Fraktal
    const meta = {
        fractal: NCROM.meta.fractal,
        source: NCROM.meta.source,
        value: (pulse * orbit) + drift
    };

    // Raum-Fraktal
    const space = {
        matrix: NCROM.space.matrix.cache,
        source: NCROM.space.source.cache
    };

    return {
        origin: NCROM.origin,
        state: NCROM.state,
        expand: NCROM.expand,

        p, v, i,
        OI,
        IX,
        eingang,
        ursache,

        pulse,
        orbit,
        drift,

        echo,
        synapse,

        cacheX,
        cacheY,

        meta,
        space,

        x: eingang + pulse + orbit + drift + synapse
    };
}
