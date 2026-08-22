// pipeline/room.js
// ROOM_PIPELINE: nutzt pipeline4 + erzeugt iki1uc.space

import { PIPELINE4 } from "./pipeline.js";

export const ROOM_PIPELINE = {

    SOURCE: "pipeline4",
    TARGET: "iki1uc.space",

    CONTENT: {
        PLACEMENT: true,
        DISTRIBUTION: true
    },

    FLOW: ["AU", "RA", "iki1uc.space"],

    run(frame, op, raw) {

        // 1. pipeline4 ausführen
        const p = PIPELINE4.run(frame, op, raw);

        // 2. PLACEMENT (Position im Raum)
        const placement = {
            x: frame.syn,
            y: frame.vec,
            z: frame.flx,
            t: Date.now()
        };

        // 3. DISTRIBUTION (Verteilung im Raum)
        const distribution = {
            lanes: p.a.warmup?.lanes || 1,
            tmp: p.t.tmp,
            hdf: p.t.tmp?.hdf
        };

        // 4. Raum erzeugen
        return {
            placement,
            distribution,
            pipeline: p,
            target: this.TARGET,
            ready: true
        };
    }
};
