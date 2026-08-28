import { RUN3_Movement } from "./run3.js";
import { ghost5E } from "./ghost.js";
import { DirectV } from "./directV.js";
import { GPU_MATRIX_692_TENSOR } from "./gpu.matrix692.tensor.js";
import { FUSION9 } from "./fusion9.js";
import { scoreRespo } from "./respo.js";

sendToCubik(matrix){

    // 1. Position aus Matrix
    const pos = matrix[4][4];

    // 2. Achsen
    const axes = AXES.fullMatrix();

    // 3. Orbit (ghost5E)
    const ghost = ghost5E(pos.Phi, pos.phi, pos.phi2, pos.phiinfty);

    // 4. RUN‑3 Movement
    const movement = RUN3_Movement(
        axes.bewegung,
        ghost.orbit,
        ghost.operatoren
    );

    // 5. DirectV Routing
    DirectV.routeRUN3(movement);

    // 6. Score
    const respo = scoreRespo({
        confs: [pos.val, movement.fusion.stabil, ghost.orbit.evo],
        text: JSON.stringify(pos)
    });

    // 7. GPU‑Tensor aktualisieren
    GPU_MATRIX_692_TENSOR.update(
        pos,
        axes,
        movement,
        ghost.orbit,
        respo.final,
        {
            orbit: ghost.orbit,
            operatoren: ghost.operatoren,
            status: ghost.status,
            erinnerung: ghost.erinnerung,
            movement: movement
        }
    );

    // 8. tmp aktualisieren
    updateTmp(pos, axes, movement, ghost.orbit);

    // 9. FUSION9 erzeugen
    const fusion = FUSION9.fuse(matrix, movement, GPU_MATRIX_692_TENSOR);

    // 10. Cubik4D aktualisieren
    Cubik4D.update(
        pos,
        axes,
        movement,
        ghost.orbit,
        respo.final,
        GPU_MATRIX_692_TENSOR
    );

    return {
        pos,
        axes,
        movement,
        orbit: ghost.orbit,
        score: respo.final,
        gpu: GPU_MATRIX_692_TENSOR,
        fusion,
        directV: DirectV.state
    };
}
