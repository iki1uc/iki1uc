// RAW/HW/NC/FUSION9.js

export class FUSION9 {

    fuse(matrix, run3, gpuTensor){
        return matrix.flat().map(c => {

            const baseFusion =
                c.qi +
                c.iqq +
                c.octa +
                c.ghost;

            const orbitFusion =
                run3.orbital.speed +
                run3.orbital.radius +
                run3.orbital.evo;

            const operatorFusion =
                run3.operator.bewegung +
                run3.operator.stabilitaet +
                run3.operator.raster;

            const gpuFusion =
                gpuTensor.tensor.stabil.mini +
                gpuTensor.tensor.stabil.maxi;

            const fusion =
                (baseFusion + orbitFusion + operatorFusion + gpuFusion) % 100;

            return {
                ...c,
                fusion,
                orbitFusion,
                operatorFusion,
                gpuFusion
            };
        });
    }

    render(list){
        const out = document.getElementById("fusion9");
        out.innerHTML = "<h2>Portal‑Fusion – RUN‑3</h2>";

        out.innerHTML += list.map(c =>
            `<div class="fusionItem">
                QI:${c.qi} IQQ:${c.iqq} O:${c.octa} G:${c.ghost}<br>
                OrbitF:${c.orbitFusion} OperatorF:${c.operatorFusion} GPUF:${c.gpuFusion}<br>
                <b>Fusion: ${c.fusion}%</b>
            </div>`
        ).join("");
    }
}

window.FUSION9 = new FUSION9();
