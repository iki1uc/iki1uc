import { computeAxes } from "./axes.js";
import { computeLAGE } from "./lage.js";
import { ghost5E } from "./ghost.js";

import { RUN3_Movement } from "./run3.js";
import { DirectV } from "./directV.js";
import { GPU_MATRIX_692_TENSOR } from "./gpu.matrix692.tensor.js";
import { FUSION9 } from "./fusion9.js";

import { updateTmp } from "./tmp.js";
import { Cubik4D } from "./cubik4d.js";

import { scoreRespo } from "./respo.js";

export function respo9hoch9(Phi, phi, phi2, phiinfty) {

    // 1. Achsen / Lage / Ghost erzeugen
    const axes = computeAxes(Phi, phi, phi2, phiinfty);
    const lage = computeLAGE(Phi, phi, phi2, phiinfty);
    const ghost = ghost5E(Phi, phi, phi2, phiinfty);

    // 2. RUN‑3 Movement erzeugen
    const movement = RUN3_Movement(
        axes.bewegung,
        ghost.orbit,
        ghost.operatoren
    );

    // 3. DirectV Routing aktivieren
    DirectV.routeRUN3(movement);

    // 4. Score berechnen
    const respo = scoreRespo({
        confs: [
            lage.mini?.val || 0.5,
            movement.fusion?.stabil || 0.5,
            ghost.orbit?.evo || 0.5
        ],
        text: JSON.stringify({ Phi, phi, phi2, phiinfty })
    });

    // 5. GPU‑Tensor aktualisieren
    GPU_MATRIX_692_TENSOR.update(
        lage.mini,
        lage.maxi,
        { mini: lage.mini.stabil, maxi: lage.maxi.stabil },
        692,
        respo.final,
        {
            orbit: ghost.orbit,
            operatoren: ghost.operatoren,
            status: ghost.status,
            erinnerung: ghost.erinnerung,
            movement
        }
    );

    // 6. tmp aktualisieren (4D)
    updateTmp(
        lage.mini,
        axes,
        movement,
        ghost.orbit
    );

    // 7. FUSION9 erzeugen
    const fusion = FUSION9.fuse(
        axes.matrix || [],
        movement,
        GPU_MATRIX_692_TENSOR
    );

    // 8. Cubik4D aktualisieren (6D)
    Cubik4D.update(
        lage.mini,
        axes,
        movement,
        ghost.orbit,
        respo.final,
        GPU_MATRIX_692_TENSOR
    );

    return {
        cube: "9hoch9",
        axes,
        lage,
        ghost,
        movement,
        score: respo.final,
        gpuTensor: GPU_MATRIX_692_TENSOR,
        fusion,
        directV: DirectV.state,
        tmp: "aktualisiert",
        cubik: "aktualisiert"
    };
}
