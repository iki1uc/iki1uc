import { updateTmp } from "./tmp.js";
import { syncTmpToCubik } from "./cubik4d-sync.js";

class ULTRA_KERNEL {

    build(){
        const raw = window.NC9X9 || [];
        const out = [];

        for(let r=0; r<9; r++){
            const row = [];
            for(let c=0; c<9; c++){
                const val = raw[r][c];

                row.push({
                    r, c,
                    val,
                    qi: AXES.qi(r,c),
                    iqq: AXES.iqq(r,c),
                    octa: AXES.octa(r,c),
                    orbit: GHOST.orbit(r,c),
                    lage: LAGE.pos(r,c),
                    core: XCORE.map(r,c),
                    in: XIN.map(r,c),
                    out: XOUT.map(r,c)
                });
            }
            out.push(row);
        }

        return out;
    }

    sendToVector(matrix){
        VECTOR?.receive9hoch9(matrix);
    }

    sendToALL(matrix){
        ALL?.receive9hoch9(matrix);
    }

    sendToCubik(matrix){
        const pos = matrix[4][4];        // Zentrum
        const axes = AXES.fullMatrix();  // komplette Achsen
        const movement = FLOW.vector();  // Bewegungsvektor
        const orbit = ORBIT.state();     // Umlaufzustand

        updateTmp(pos, axes, movement, orbit);
        syncTmpToCubik();
    }

    start(){
        const matrix = this.build();
        this.sendToVector(matrix);
        this.sendToALL(matrix);
        this.sendToCubik(matrix);
        return matrix;
    }
}

window.ULTRA_KERNEL = new ULTRA_KERNEL();
