// genie.js – Struktur-Bewertung (real, technisch, iki1uc-kompatibel)
import { NCROM } from "../NCROM/rom.mode.js";

export function GENIE_structure(struct) {

    // Strukturwert
    const base = struct.length || 1;

    // Pulse / Orbit / Drift (technisch berechnet)
    const pulse = base % 9;
    const orbit = (base * pulse) % 9;
    const drift = (base - pulse + orbit) % 9;

    // Synaptische Bewertung (rein mathematisch)
    const synapse = (pulse + orbit + drift) % 9;

    // Score (technisch, nicht metaphysisch)
    const score = base + pulse + orbit + drift + synapse;

    return {
        id: `S-${Date.now()}`,
        struct,
        pulse,
        orbit,
        drift,
        synapse,
        score,
        origin: NCROM.origin,
        state: NCROM.state
    };
}
