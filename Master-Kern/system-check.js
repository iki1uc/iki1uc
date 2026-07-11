document.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await fetch("./Master-Kern/system-check.item");

    if (!res.ok) {
      window.location.href = "./error.root.html?path=system-check.item";
      return;
    }

    const text = await res.text();

    // --- LAGE CHECK ---
    const lageOK =
      text.includes("STATE: aktiv") &&
      text.includes("REAL: gesetzt");

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
