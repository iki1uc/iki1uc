// ============================================================
// IKI1UC · MASTER-SORTIERER · Ordnet Narrative
// ============================================================

import { NarrativEngine } from '../core/dreieck-narrativ.js';

class IKI1UC_Master {
  constructor() {
    this.name = "iki1uc";
    this.narrative = [];
    this.sortierung = {};
    this.gewichtung = {};
  }

  // Nimmt Narrative von 243 und sortiert sie
  sortiereNarrative(narrative) {
    // Nach Gewichtung sortieren
    const sortiert = [...narrative].sort((a, b) => b.gewichtung - a.gewichtung);
    
    // Kategorien bilden
    const kategorien = {
      schwer: sortiert.filter(n => n.gewichtung >= 6),
      mittel: sortiert.filter(n => n.gewichtung >= 3 && n.gewichtung < 6),
      leicht: sortiert.filter(n => n.gewichtung < 3)
    };

    this.sortierung = kategorien;
    this.narrative = sortiert;
    return this.sortierung;
  }

  // Gewichtet die Narrative neu (mit 3er-Regel)
  gewichteNeu(narrativ) {
    const punkte = narrativ.triolets.map(t => t.gewicht);
    const summe = punkte.reduce((a, b) => a + b, 0);
    const gewicht = summe % 3 === 0 ? 3 : summe % 3;
    return { ...narrativ, gewichtung: gewicht };
  }

  // Erzeugt eine Master-Matrix (3×3)
  erzeugeMasterMatrix(triolets) {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
      const zeile = [];
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        zeile.push(triolets[idx] || { status: "leer" });
      }
      matrix.push(zeile);
    }
    return matrix;
  }

  // Baut aus allen Kandidaten ein vollständiges Narrativ
  baueNarrativ(alleKandidaten) {
    const triolets = [];
    
    // Gruppiere in 3er-Gruppen
    for (let i = 0; i < alleKandidaten.length; i += 3) {
      const gruppe = alleKandidaten.slice(i, i + 3);
      if (gruppe.length === 3) {
        const engine = new NarrativEngine();
        const dreieck = new Dreieck(gruppe[0], gruppe[1], gruppe[2]);
        const triolet = engine.verarbeiteDreieck(dreieck);
        triolets.push(triolet);
      }
    }

    const narrativ = {
      kandidaten: alleKandidaten,
      triolets: triolets,
      anzahlTriolets: triolets.length,
      gesamtKandidaten: alleKandidaten.length,
      sortierung: this.sortiereNarrative(triolets),
      matrix: this.erzeugeMasterMatrix(triolets),
      status: "vollständiges_narrativ",
      erzeugt: new Date().toISOString()
    };

    this.narrative.push(narrativ);
    return narrativ;
  }

  // Zeigt alle Narrative
  zeigeAlle() {
    return this.narrative;
  }
}

export { IKI1UC_Master };
