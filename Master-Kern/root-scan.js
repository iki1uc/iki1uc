document.addEventListener("DOMContentLoaded", async () => {

  // MASTER-KERN: ROOT-SCAN
  const ROOT_SCAN = {
    orbit: "pending",
    identity: "pending",
    lage: "pending",
    system: "pending"
  };

  // ORBIT-SCAN
  try {
    const o = await fetch("./visual/Orbit.html");
    ROOT_SCAN.orbit = o.ok ? "ok" : "missing";
  } catch {
    ROOT_SCAN.orbit = "error";
  }

  // ID-SCAN
  try {
    const i = await fetch("./ID.html");
    ROOT_SCAN.identity = i.ok ? "ok" : "missing";
  } catch {
    ROOT_SCAN.identity = "error";
  }

  // LAGE-SCAN
  try {
    const l = await fetch("./visual/LAGE.html");
    ROOT_SCAN.lage = l.ok ? "aktiv" : "missing";
  } catch {
    ROOT_SCAN.lage = "error";
  }

  // SYSTEM-CHECK
  ROOT_SCAN.system =
    ROOT_SCAN.orbit === "ok" &&
    ROOT_SCAN.identity === "ok" &&
    ROOT_SCAN.lage === "aktiv"
      ? "ok"
      : "unstabil";

  // Markdown erzeugen
  const md = `
# SEEu – ROOT-SCAN (36E)
Orbit: ${ROOT_SCAN.orbit}
Identity: ${ROOT_SCAN.identity}
LAGE: ${ROOT_SCAN.lage}
System: ${ROOT_SCAN.system}

# Pipeline
MASTER-SCANNER: aktiv
SYSTEM-CHECK: ${ROOT_SCAN.system}
ERROR-ROUTER: aktiv
ROOT-ERROR: bereit

# Export
SEEu.md wurde automatisch erzeugt.
`;

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "SEEu.md";
  a.click();
});
