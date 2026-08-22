// ghost/ghost.js
// GHOST_ENGINE: ACTIVE – zentrale Ghost-Logik für iki1uc

import { DRIFT_SCAN } from "./drift.scan";
import { DEADLOCK_SCAN } from "./deadlock.scan";

export const GHOST_ENGINE = {

    state: {
        mode: "idle",        // idle / drift / interfere / lock / shadow
        power: 0,            // Ghost-Energielevel
        trace: [],           // Ghost-Spuren
        active: true         // Engine aktiv
    },

    // === Ghost aktivieren ===
    activate(mode = "drift") {
        this.state.mode = mode;
        this.state.power = 1;
        this.state.active = true;
        this.state.trace.push({ mode, t: Date.now() });
        return this.state;
    },

    // === Ghost deaktivieren ===
    deactivate() {
        this.state.mode = "idle";
        this.state.power = 0;
        this.state.active = false;
        this.state.trace.push({ mode: "idle", t: Date.now() });
        return this.state;
    },

    // === Ghost-Interferenz erzeugen ===
    interfere(target) {
        if (!this.state.active) return target;

        this.state.mode = "interfere";
        this.state.power += 0.2;

        return {
            ...target,
            ghost: {
                mode: "interfere",
                power: this.state.power
            }
        };
    },

    // === Ghost-Drift erzeugen ===
    drift(target) {
        if (!this.state.active) return target;

        this.state.mode = "drift";
        this.state.power += 0.1;

        return {
            ...target,
            ghost: {
                mode: "drift",
                offset: this.state.power
            }
        };
    },

    // === Ghost-Lock (Deadlock provozieren) ===
    lock(target) {
        this.state.mode = "lock";
        this.state.power += 0.5;

        return {
            ...target,
            lock: {
                owner: "ghost",
                waiting: ["ghost"],
                power: this.state.power
            }
        };
    },

    // === Ghost-Analyse: Drift + Deadlock ===
    analyze(systemState) {
        const drift = DRIFT_SCAN(systemState);
        const dead = DEADLOCK_SCAN(systemState);

        return {
            drift,
            dead,
            ghost: this.state
        };
    }
};
