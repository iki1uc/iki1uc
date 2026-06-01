import { EVENTS } from "./events.js";

EVENTS.on("system_error", err => {
    const box = document.getElementById("systemErrorBox");
    if(!box) return;

    box.innerHTML = `
        <div class="err">
            <b>⚠ SYSTEMFEHLER</b><br>
            <span>${err.type}</span><br>
            <small>${err.detail}</small>
        </div>
    `;
    box.style.display = "block";
});

