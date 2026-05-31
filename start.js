// SHIFT-System Instanz 2.0

if (!localStorage.getItem("PREV")) localStorage.setItem("PREV", "index");
if (!localStorage.getItem("NEXT")) localStorage.setItem("NEXT", "SHIFT");

const script = document.createElement("script");
script.src = "live.js";
document.head.appendChild(script);

script.onload = () => {

  // LIVE starten
  const result = liveCore("start");
  live_out(result);

  // → CUBE‑2 Sync
  if (typeof cube2_surface === "function") {
      cube2_surface("SHIFT‑Start");
  }

  // → CUBE‑3 Sync
  if (typeof cube3_run === "function") {
      cube3_run("SHIFT‑Start", null, null, "INIT");
  }

  // → ALL4ALL Routing
  if (typeof live_toA4A === "function") {
      live_toA4A(result);
  }

  // → Respo‑Ping
  if (typeof live_respo === "function") {
      console.log("RESPO:", live_respo());
  }

  // → Name‑Ping
  if (typeof live_name === "function") {
      console.log("INSTANCE:", live_name());
  }
};
