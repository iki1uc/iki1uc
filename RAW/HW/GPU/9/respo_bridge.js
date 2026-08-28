// 9hoch9 / respo_bridge.js

import { computeAxes } from "./axes.js";
import { computeLAGE } from "./lage.js";
import { ghost5E } from "./ghost.js";

import { updateTmp } from "./tmp.js";
import { Cubik4D } from "./cubik4d.js";

import { scoreRespo } from "./respo.js";

export function respo9hoch9(Phi, phi, phi2, phiinfty) {

    // 1. Achsen / Lage / Ghost erzeugen
    const axes = computeAxes(Phi, phi, phi2, phiinfty);
    const lage = computeLAGE(Phi, phi, phi2, phiinfty);
    const ghost = ghost5E(Phi, phi, phi2, phiinfty);

    // 2. Score berechnen
    const respo = scoreRespo({
        confs: [
            lage.mini?.val || 0.5,
            axes.bewegung?.mag || 0.5,
            ghost.orbit?.level || 0.5
        ],
        text: JSON.stringify({ Phi, phi, phi2, phiinfty })
    });

    // 3. tmp aktualisieren (4D)
    updateTmp(
        lage.mini,
        axes,
        axes.bewegung,
        ghost.orbit
    );

    // 4. Cubik4D aktualisieren (5D)
    Cubik4D.update(
        lage.mini,
        axes,
        axes.bewegung,
        ghost.orbit,
        respo.final
    );

    return {
        cube: "9hoch9",
        axes,
        lage,
        ghost,
        score: respo.final,
        tmp: "aktualisiert",
        cubik: "aktualisiert"
    };
}
