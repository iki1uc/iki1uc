// SHIFT · CUBE‑LIVE SOLL-Version + System-Integration
// ID: SHIFT-LIVE / ROLE: Zeitmotor

const CUBE_ID = "SHIFT-LIVE";
const ROLE = "Zeitmotor";

let STATE = localStorage.getItem("STATE") || "idle";

// --- System-Integration ---

function liveGetSchiene() {
  return {
    prev: localStorage.getItem("PREV") || "unknown",
    now: "SHIFT",
    next: localStorage.getItem("NEXT") || "unknown"
  };
}

function liveGetGrav() {
  return localStorage.getItem("GRAV") || "0";
}

function liveGetCluster() {
  return localStorage.getItem("MODE") || "AB";
}

function liveChain(next) {
  localStorage.setItem("PREV", "SHIFT");
  localStorage.setItem("NEXT", next);
}

// --- Kernkompetenz ---

function liveSetState(newState) {
  STATE = newState;
  localStorage.setItem("STATE", newState);
}

function liveCore(input) {
  return {
    in: input,
    out: `SHIFT-LIVE(${input})`,
    mode: liveGetCluster(),
    grav: liveGetGrav(),
    state: STATE,
    schiene: liveGetSchiene()
  };
}

function live_out(data) {
  document.getElementById("out").innerHTML = `
    <div class="out-title">SHIFT-LIVE – Echtzeit</div>
    <div class="out-ist"><b>IN:</b> ${data.in}</div>
    <div class="out-soll"><b>OUT:</b> ${data.out}</div>
    <div class="out-mode"><b>MODE:</b> ${data.mode}</div>
    <div class="out-grav"><b>GRAV:</b> ${data.grav}</div>
    <div class="out-state"><b>STATE:</b> ${data.state}</div>
    <div class="out-schiene"><b>SCH:</b> ${data.schiene.prev} → SHIFT → ${data.schiene.next}</div>
  `;
}

/* ============================================================
   SHIFT-LIVE UPGRADE 2026
   – Meta‑Sync zu CUBE‑3
   – ALL4ALL Routing
   – Respo‑Check
   – Name‑Check
============================================================ */

// 1) SHIFT-LIVE → CUBE‑3 Meta‑Sync
window.live_toC3 = function(input) {
    if (typeof cube3_run === "function") {
        cube3_run("SHIFT→C3:" + input, null, null, "SHIFT‑SYNC");
    }
};

// 2) SHIFT-LIVE → ALL4ALL Routing
window.live_toA4A = function(data) {
    const el = document.getElementById("all4all-status");
    if (!el) return;

    el.textContent =
        "ALL4ALL‑ROUTING\n" +
        "───────────────\n" +
        "IN:  " + data.in + "\n" +
        "OUT: " + data.out + "\n" +
        "MODE: " + data.mode + "\n" +
        "GRAV: " + data.grav + "\n" +
        "CUBE: " + CUBE_ID + "\n" +
        "ROLE: " + ROLE + "\n";
};

// 3) Respo‑Check
window.live_respo = function() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.innerWidth + "×" + window.innerHeight
    };
};

// 4) Name‑Check
window.live_name = function() {
    return "SHIFT-LIVE#2026";
};
