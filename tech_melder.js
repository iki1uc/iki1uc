// tech_melder.js — globaler Technik-Status

window.TECH_LOG = window.TECH_LOG || [];

export function TECH_OK(tech, id){
    const entry = {
        tech,
        id,
        ok: true,
        ts: performance.now(),
        msg: `${tech}(${id}) ✔ läuft`
    };
    window.TECH_LOG.push(entry);
    renderTechLog();
    return entry;
}

export function TECH_FAIL(tech, id, reason){
    const entry = {
        tech,
        id,
        ok: false,
        ts: performance.now(),
        msg: `${tech}(${id}) ✖ Fehler: ${reason}`
    };
    window.TECH_LOG.push(entry);
    renderTechLog();
    return entry;
}

function renderTechLog(){
    const el = document.getElementById("tech-monitor");
    if(!el) return;

    el.innerHTML = window.TECH_LOG
        .map(e => e.msg)
        .join("<br>");
}

