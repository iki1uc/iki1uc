// --- RESPO CHECK ---
const respoOK =
  text.includes("RESPO.NAME = RESPO.iki1uc") &&
  text.includes("RESPO.STATION = LAGE") &&
  text.includes("RESPO.BEAM = ROOT / Creator / NC") &&
  text.includes("RESPO.MODE = aktiv") &&
  text.includes("RESPO.INTERAKTION = übernommen");

if (!respoOK) {
  window.location.href = "./error.root.html?path=respo";
  return;
}
