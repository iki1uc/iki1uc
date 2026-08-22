// ------------------------------------------------------
// BIOS LOADER · 36E
// Dynamischer Boot-Kernel für dein BIOS-System
// ------------------------------------------------------

const BIOS_LOADER = {
    steps: [
        "Kernel laden...",
        "Stationen prüfen...",
        "NC ✓",
        "Phi ✓",
        "Phi2 ✓",
        "PhiInfinity ✓",
        "System starten..."
    ],

    index: 0,

    next() {
        if (this.index >= this.steps.length) {
            return "BIOS: System erfolgreich gestartet.";
        }
        const s = this.steps[this.index];
        this.index++;
        return s;
    },

    reset() {
        this.index = 0;
    }
};

// ------------------------------------------------------
// BOOT
// ------------------------------------------------------

function biosBoot() {
    const out = document.getElementById("bios_out");
    BIOS_LOADER.reset();

    let log = "[BOOT]\n";

    for (let i = 0; i < BIOS_LOADER.steps.length + 1; i++) {
        log += BIOS_LOADER.next() + "\n";
    }

    out.textContent = log.trim();
}

// ------------------------------------------------------
// INFO
// ------------------------------------------------------

function biosInfo() {
    const out = document.getElementById("bios_out");

    out.textContent =
`[INFO]
36E BIOS Version: 1.0
Kernel: aktiv
Stationen: 4
Status: stabil`;
}
