// toolomat_scripts.js

function sendAxes(){

    // Beispielwerte – später dynamisch
    const Phi = 1.0;
    const phi = 0.7;
    const phi2 = 0.4;
    const phiinfty = 0.9;

    const result = ghost5E(Phi, phi, phi2, phiinfty);

    const out = document.getElementById("out");
    if(!out) return;

    out.textContent =
`=== TOOLOMAT OUTPUT ===

M₅: ${result.M5.toFixed(4)}
G_total: ${result.G_total.toFixed(4)}
Status: ${result.status}

Orbit:
  speed: ${result.orbit.speed}
  radius: ${result.orbit.radius}
  evo: ${result.orbit.evo}

Operatoren:
  bewegung: ${result.operatoren.bewegung}
  stabilitaet: ${result.operatoren.stabilitaet}
  raster: ${result.operatoren.raster}

LAGE:
  x: ${result.lage.x}
  y: ${result.lage.y}
  z: ${result.lage.z}
  stabil: ${result.lage.stabil}

GHOST‑5E: Aktiv
`;
}
