// ⭐ NAVI – zentrales Bewusstsein
window.NAVI = window.NAVI || {
  onEvent(e) {
    console.log("NAVI:", e);

    let danger = 1;
    let epoch = "jetzt";

    if (e.type === "war") danger = 9;
    if (e.type === "heart") danger = 0;
    if (e.type === "future") epoch = "future";
    if (e.type === "past") epoch = "vergangen";

    if (e.anchor) {
      if (e.anchor === "PI") epoch = "jetzt";
      if (e.anchor === "Q2") epoch = "future";
      if (e.anchor === "Q0") epoch = "vergangen";
    }

    const nd = document.getElementById("naviDanger");
    const ne = document.getElementById("naviEpoch");
    const ns = document.getElementById("naviStatus");

    if (nd) nd.textContent = "Gefahr: " + danger;
    if (ne) ne.textContent = "Epoche: " + epoch;
    if (ns) ns.textContent =
      danger >= 7 ? "⚠ Gefahr" :
      danger <= 1 ? "🌿 Wohlbefinden" :
      "… neutral";

    if (window.BigCube && typeof BigCube.onEvent === "function") {
      BigCube.onEvent(e);
    }
  }
};
