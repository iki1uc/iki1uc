// y.js – iki1uc Bewegungskern (NCROM / 9q9q9 / Meta / Echo-Hall)
import { NCROM } from "../NCROM/rom.mode.js";

export function Y(p, v, i) {

    // Grundbewegung
    const IO = p * i;          // Drehen
    const XI = v + i;          // Schließen
    const ausgang = IO + XI;   // Ausgang
    const wirkung = ausgang;   // Wirkung

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
        IO,
        XI,
        ausgang,
        wirkung,

        pulse,
        orbit,
        drift,

        echo,
        synapse,

        cacheX,
        cacheY,

        meta,
        space,

        y: ausgang + pulse + orbit + drift + synapse
    };
}
