// ready-ticker.js
import { READY } from "./ready.js";

export function startReadyTicker() {
    const box = document.getElementById("ready-box");

    setInterval(() => {
        const val = READY();
        box.innerText = "READY: " + val;
    }, 1000);
}
