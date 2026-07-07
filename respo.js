const RESPO_AXIS = [
  "SYS", "TEM", "IKI", "BIR",
  "N0", "NS", "NC", "NC.sub",
  "ART.link", "Ghost-Scan",
  "TriAxiom", "BOERSE"
];

// Ghost-Scan Hook
function ghostScanCarry() {
  RESPO_AXIS.forEach((mod, i) => {
    console.log(`Ghost-Scan trägt: ${mod} → RESPO-LAYER-${i}`);
  });
}

// Startet die spätere Auswertung
ghostScanCarry();

