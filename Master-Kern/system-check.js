document.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch("./Master-Kern/system-check.item");

    if (!res.ok) {
      window.location.href = "./error.root.html?path=system-check.item";
      return;
    }

    const text = await res.text();

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

    // --- LAGE CHECK ---
    const lageOK =
      text.includes("lage.state: aktiv") &&
      text.includes("lage.real: gesetzt");

    if (!lageOK) {
      window.location.href = "./error.root.html?path=LAGE-CODE-FINAL.nc";
      return;
    }

    // --- SYSTEM CHECK ---
    const ok =
      text.includes("drift.ok") &&
      text.includes("fuse.ok") &&
      text.includes("root.state: wait");

    if (!ok) {
      window.location.href = "./error.root.html?path=system-check.item";
      return;
    }

    console.log("SYSTEM-CHECK: OK");

  } catch {
    window.location.href = "./error.root.html?path=system-check.item";
  }

});
