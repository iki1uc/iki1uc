// pipeline/suite.js
// SUITE: Raum + Pipeline + Temporalität

import { ROOM_PIPELINE } from "./room.js";
import { PIPELINE4 } from "./pipeline.js";

export const SUITE = {

    MODULES: {
        ROOM: ROOM_PIPELINE,
        PIPELINE: PIPELINE4
    },

    TARGET: "iki1uc.suite",

    run(frame, op, raw) {

        const room = ROOM_PIPELINE.run(frame, op, raw);
        const pipe = PIPELINE4.run(frame, op, raw);

        return {
            room,
            pipe,
            target: this.TARGET,
            ready: true
        };
    }
};
