// space/suite.js
// SPACE-SUITE: Raum + Koordinaten + Continuum

import { ROOM_PIPELINE } from "../pipeline/room.js";
import coords from "./coords.json";
import continuum from "./CONTINUUM.json";

export const SPACE_SUITE = {

    SOURCE: "ROOM_PIPELINE",
    TARGET: "iki1uc.space",

    run(frame, op, raw) {

        const room = ROOM_PIPELINE.run(frame, op, raw);

        return {
            room,
            coords,
            continuum,
            target: this.TARGET,
            ready: true
        };
    }
};

