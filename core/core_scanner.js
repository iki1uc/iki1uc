// ⭐ Scanner / Epochen‑Achsen
window.AXIS = window.AXIS || { x: 0, y: 0, z: 0 };

function updateEpochen() {
  const ex = document.getElementById("epX");
  const ey = document.getElementById("epY");
  const ez = document.getElementById("epZ");
  if (ex) ex.textContent = AXIS.x;
  if (ey) ey.textContent = AXIS.y;
  if (ez) ez.textContent = AXIS.z;
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("scanZack")?.addEventListener("click", () => {
    AXIS.z++;
    updateEpochen();
    NAVI.onEvent({ type: "past", anchor: window.PAGE_ANCHOR || "PI", time: Date.now() });
  });

  document.getElementById("scanME")?.addEventListener("click", () => {
    AXIS.y++;
    updateEpochen();
    NAVI.onEvent({ type: "now", anchor: window.PAGE_ANCHOR || "PI", time: Date.now() });
  });

  document.getElementById("scanKlick")?.addEventListener("click", () => {
    AXIS.x++;
    updateEpochen();
    NAVI.onEvent({ type: "future", anchor: window.PAGE_ANCHOR || "PI", time: Date.now() });
  });

  updateEpochen();
});

