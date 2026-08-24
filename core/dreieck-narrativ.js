// ============================================================
// DREIECK → NARRATIV · 243 + iki1uc
// ============================================================

// Ein Dreieck hat 3 Punkte → 3 Kandidaten
class Dreieck {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.kandidaten = [a, b, c];
  }

  // Gibt alle 3 Ecken zurück
  ecken() {
    return this.kandidaten;
  }

  // Prüft ob das Dreieck gültig ist
  istGueltig() {
    return this.a !== undefined && this.b !== undefined && this.c !== undefined;
  }
}

// 243: Macht aus Dreiecken Narrative
class NarrativEngine {
  constructor() {
    this.name = "243";
    this.regel = "3 → 3 → 3";
    this.narrative = [];
  }

  // Verarbeitet ein Dreieck zu einem Triolet
  verarbeiteDreieck(dreieck) {
    if (!dreieck.istGueltig()) {
      return { status: "ungültig", grund: "Dreieck unvollständig" };
    }

    // 3 Ecken → 3 Paare → 3 Beziehungen
    const ecken = dreieck.ecken();
    const triolet = {
      ecke1: ecken[0],
      ecke2: ecken[1],
      ecke3: ecken[2],
      beziehung1: `${ecken[0]} ↔ ${ecken[1]}`,
      beziehung2: `${ecken[1]} ↔ ${ecken[2]}`,
      beziehung3: `${ecken[2]} ↔ ${ecken[0]}`,
      status: "triolet",
      gewicht: this.gewicht(ecken)
    };

    this.narrative.push(triolet);
    return triolet;
  }

  // Gewichtung: 1=leicht, 2=mittel, 3=schwer
  gewicht(ecken) {
    let summe = 0;
    for (const ecke of ecken) {
      if (typeof ecke === 'string') {
        summe += ecke.length % 3 + 1;
      } else {
        summe += 1;
      }
    }
    return Math.min(summe, 3);
  }

  // Erzeugt ein Narrativ aus mehreren Triolets
  erzeugeNarrativ(triolets) {
    const narrativ = {
      triolets: triolets,
      anzahl: triolets.length,
      gewichtung: triolets.map(t => t.gewicht).reduce((a, b) => a + b, 0),
      status: "narrativ",
      erzeugt: new Date().toISOString()
    };
    return narrativ;
  }

  // Alle Narrative anzeigen
  zeigeNarrative() {
    return this.narrative;
  }
}

export { Dreieck, NarrativEngine };
