document.addEventListener("DOMContentLoaded", async () => {

  const result = {
    scanner: "unknown",
    system: "unknown",
    stations: []
  };

  // MASTER-SCANNER lesen
  try {
    const ms = await fetch("./Master-Kern/MASTER-SCANNER.html");
    result.scanner = ms.ok ? "ok" : "missing";
  } catch {
    result.scanner = "error";
  }

  // SYSTEM-CHECK lesen
  try {
    const sc = await fetch("./Master-Kern/system-check.item");
    result.system = sc.ok ? "ok" : "missing";
  } catch {
    result.system = "error";
  }

  // Stationsstatus aus root-station-check.js übernehmen
  const stationBox = document.getElementById("station-status");
  if (stationBox) {
    result.stations = stationBox.innerText.split("\n");
  }

  // SEEu.md erzeugen
  const md = `
# SEEu – ROOT-SCAN
MASTER-SCANNER: ${result.scanner}
SYSTEM-CHECK: ${result.system}

## Stations
${result.stations.join("\n")}
`;

  // Datei erzeugen (Browser-Download)
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "SEEu.md";
  a.click();
});
