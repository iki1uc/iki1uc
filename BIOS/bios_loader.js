function biosBoot() {
    const out = document.getElementById("bios_out");

    out.textContent =
`[BOOT]
Kernel geladen...
Stationen prüfen...
NC ✓
Phi ✓
Phi2 ✓
PhiInfinity ✓

BIOS: System erfolgreich gestartet.`;
}

function biosInfo() {
    const out = document.getElementById("bios_out");

    out.textContent =
`[INFO]
36E BIOS Version: 1.0
Kernel: aktiv
Stationen: 4
Status: stabil`;
}

