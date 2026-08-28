// RAW/HW/GPU/9/pipeline12.master.js

import { ULTRA_KERNEL } from "./ultra.kernel.js";
import { respo9hoch9 } from "./respo_bridge.js";
import { Cubik4D } from "./cubik4d.js";
import GPU_MAP from "../gpu.map";

export class PIPELINE12 {

    constructor(){
        this.kernel = window.ULTRA_KERNEL;
        this.gpu = GPU_MAP;
        this.lastMatrix = null;
        this.lastRespo = null;
        this.lastCubik = null;
    }

    // 1. ULTRA-KERNEL → 9×9 Matrix
    stage1_buildMatrix(){
        this.lastMatrix = this.kernel.build();
        return this.lastMatrix;
    }

    // 2. respo_bridge → Achsen/Lage/Ghost → tmp + Cubik4D
    stage2_respoBridge(){
        const m = this.lastMatrix;
        const center = m[4][4];

        this.lastRespo = respo9hoch9(
            center.val,
            center.qi,
            center.iqq,
            center.octa
        );

        return this.lastRespo;
    }

    // 3. GPU-MAP → GPU-Stages in den Kubus einrechnen
    stage3_gpuStages(){
        const cubik = Cubik4D;

        cubik.GPU = {
            stage1: this.gpu.STAGE?.["1"],
            stage2: this.gpu.STAGE?.["2"],
            stage3: this.gpu.STAGE?.["3"],
            stage4: this.gpu.STAGE?.["4"],
            level: this.gpu.LEVEL,
            mode: this.gpu.MODE,
            state: this.gpu.STATE
        };

        return cubik.GPU;
    }

    // 4. Finaler 5D-Kubus zurückgeben
    stage4_output(){
        this.lastCubik = Cubik4D;
        return this.lastCubik;
    }

    // MASTER-PIPELINE
    start(){
        this.stage1_buildMatrix();
        this.stage2_respoBridge();
        this.stage3_gpuStages();
        return this.stage4_output();
    }
}

window.PIPELINE12 = new PIPELINE12();

