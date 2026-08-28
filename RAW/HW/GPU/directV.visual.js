// RAW/HW/GPU/directV.visual.js

export const DirectVVisual = {

    mount(id){
        this.el = document.getElementById(id);
    },

    render(run3, directVState){

        const html = `
            <h2>RUN‑3 DirectV Visualisierung</h2>

            <div class="dvBlock">
                <h3>Orbit</h3>
                <div class="dvRow">
                    <span>Speed: ${run3.orbital.speed}</span>
                    <span>Radius: ${run3.orbital.radius}</span>
                    <span>Evo: ${run3.orbital.evo}</span>
                </div>
            </div>

            <div class="dvBlock">
                <h3>Operatoren</h3>
                <div class="dvRow">
                    <span>Bewegung: ${run3.operator.bewegung}</span>
                    <span>Stabilität: ${run3.operator.stabilitaet}</span>
                    <span>Raster: ${run3.operator.raster}</span>
                </div>
            </div>

            <div class="dvBlock">
                <h3>Fusion Movement</h3>
                <div class="dvRow">
                    <span>X: ${run3.fusion.x}</span>
                    <span>Y: ${run3.fusion.y}</span>
                    <span>Z: ${run3.fusion.z}</span>
                </div>
                <div class="dvRow">
                    <span>Stabil: ${run3.fusion.stabil}</span>
                    <span>Quant: ${run3.fusion.quant}</span>
                </div>
            </div>

            <div class="dvBlock">
                <h3>DirectV Routing</h3>
                <div class="dvRow">
                    <span>Speed: ${directVState.speed}</span>
                    <span>Stabil: ${directVState.stabil}</span>
                    <span>Quant: ${directVState.quant}</span>
                    <span>Boost: ${directVState.boost}</span>
                </div>
            </div>
        `;

        this.el.innerHTML = html;
    }
};
