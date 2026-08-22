// respo-heatmap.js
import { RESPO_AXIS } from "./core/respo.js";

export function respoHeatmap() {
    const box = document.getElementById("respo-box");

    if(JSON.stringify(RESPO_AXIS).includes("S")) {
        box.style.background = "linear-gradient(90deg,#002244,#0055aa,#66ccff)";
    }
}
