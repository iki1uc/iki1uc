import { MolekuelGeburt } from "./verhandlung-core.js";

window.addEventListener("DOMContentLoaded", () => {
  const A = { id: "A", marker: ["QI"] };
  const B = { id: "B", marker: ["Orbit"] };
  const C = { id: "C", marker: ["OP"] };

  const M = MolekuelGeburt(A, B, C);

  document.getElementById("out").textContent =
    "Molekül Zustand: " + M.state;
});
