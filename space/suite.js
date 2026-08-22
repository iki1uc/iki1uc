// space/suite.js

import HyPePer from "./HyPePer.json";
import TransWarp from "./TransWarp.json";
import Warp3 from "./Warp3.json";

export const SPACE_SUITE = {

    WARP: {
        primary: HyPePer,
        secondary: TransWarp,
        synthesis: Warp3
    },

    TARGET: "iki1uc.space",

    run(room, coords, continuum) {
        return {
            room,
            coords,
            continuum,
            warp: this.WARP,
            target: this.TARGET,
            ready: true
        };
    }
};
