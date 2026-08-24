// ============================================================
// 243 + IKI1UC · DIE NARRATIV-MASCHINE
// ============================================================

import { Dreieck, NarrativEngine } from './dreieck-narrativ.js';
import { IKI1UC_Master } from '../3_iki1uc/iki1uc-master.js';

// Die Verbindung: 243 verarbeitet → iki1uc sortiert
class NarrativMaschine {
  constructor() {
    this.engine243 = new NarrativEngine();
    this.master = new IKI1UC_Master();
    this.name = "243 + iki1uc";
    this.alleKandidaten = [];
    this.narrative = [];
  }

  // Fügt Kandidaten hinzu
  addKandidat(kandidat) {
    this.alleKandidaten.push(kandidat);
    return this;
  }

  // Fügt mehrere Kandidaten hinzu
  addKandidaten(kandidaten) {
    this.alleKandidaten = [...this.alleKandidaten, ...kandidaten];
    return this;
  }

  // Verarbeitet alle Kandidaten zu Narrativen
  verarbeiteAlle() {
    // 1. Dreiecke bilden
    const dreiecke = [];
    for (let i = 0; i < this.alleKandidaten.length; i += 3) {
      const gruppe = this.alleKandidaten.slice(i, i + 3);
      if (gruppe.length === 3) {
        dreiecke.push(new Dreieck(gruppe[0], gruppe[1], gruppe[2]));
      }
    }

    // 2. 243 verarbeitet Dreiecke zu Triolets
    const triolets = [];
    for (const dreieck of dreiecke) {
      const triolet = this.engine243.verarbeiteDreieck(dreieck);
      triolets.push(triolet);
    }

    // 3. iki1uc sortiert die Triolets
    const sortiert = this.master.sortiereNarrative(triolets);

    // 4. Narrativ bauen
    const narrativ = {
      kandidaten: this.alleKandidaten,
      anzahlKandidaten: this.alleKandidaten.length,
      dreiecke: dreiecke.length,
      triolets: triolets,
      sortierung: sortiert,
      masterMatrix: this.master.erzeugeMasterMatrix(triolets),
      status: "narrativ_komplett",
      erzeugt: new Date().toISOString()
    };

    this.narrative.push(narrativ);
    return narrativ;
  }

  // Zeigt das aktuelle Narrativ
  zeigeNarrativ() {
    if (this.narrative.length === 0) {
      return { status: "kein_narrativ", hinweis: "Bitte zuerst verarbeiteAlle() aufrufen" };
    }
    return this.narrative[this.narrative.length - 1];
  }

  // Zeigt alle Narrative
  zeigeAlleNarrative() {
    return this.narrative;
  }

  // Erzeugt eine Text-Repräsentation des Narrativs
  textNarrativ() {
    const n = this.zeigeNarrativ();
    if (n.status === "kein_narrativ") return "Kein Narrativ vorhanden.";

    let text = `🔺 NARRATIV aus ${n.anzahlKandidaten} Kandidaten\n`;
    text += `📐 ${n.dreiecke} Dreiecke → ${n.triolets.length} Triolets\n\n`;

    for (let i = 0; i < n.triolets.length; i++) {
      const t = n.triolets[i];
      if (t.status === "triolet") {
        text += `Triolet ${i+1}: ${t.ecke1} ↔ ${t.ecke2} ↔ ${t.ecke3}\n`;
        text += `  Beziehungen: ${t.beziehung1}, ${t.beziehung2}, ${t.beziehung3}\n`;
        text += `  Gewicht: ${t.gewicht}\n\n`;
      }
    }

    text += `📊 Sortierung:\n`;
    text += `  Schwer: ${n.sortierung.schwer?.length || 0}\n`;
    text += `  Mittel: ${n.sortierung.mittel?.length || 0}\n`;
    text += `  Leicht: ${n.sortierung.leicht?.length || 0}\n`;

    return text;
  }
}

export { NarrativMaschine };
