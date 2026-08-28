// RESPO_81_FINDER.js
// Spezialisiert auf 81er-Findung + Stations-Zustand in %

export const RESPO_81_FINDER = {

  // ═══════════════════════════════════════════
  // 1. FINDET 3×81 aus beliebigem Input
  // ═══════════════════════════════════════════
  find81(input) {
    const results = [];

    // Extrahiere alle Zahlen aus dem Input
    const numbers = String(input).match(/\d+/g)?.map(Number) || [];

    // Suche nach 81 oder Kombinationen die 81 ergeben
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const sum = numbers[i] + numbers[j];
        if (sum === 81) {
          results.push({
            type: "PAIR",
            a: numbers[i],
            b: numbers[j],
            sum: 81,
            source: `${numbers[i]}+${numbers[j]}`
          });
        }
        if (numbers[i] === 81) {
          results.push({
            type: "SINGLE",
            value: 81,
            source: `direkt: ${numbers[i]}`
          });
        }
      }
    }

    // Wenn keine 81 gefunden, versuche PQ-Root zu nutzen
    if (results.length === 0) {
      const root = this.pqRoot(input);
      if (root === 81 || root % 81 === 0) {
        results.push({
          type: "PQ_ROOT",
          value: root,
          source: `PQ-Root: ${root}`
        });
      }
    }

    // Sortiere: 3×81 = 243 als Ziel
    const triple81 = results.filter(r => r.value === 81 || r.sum === 81);
    const count = triple81.length;

    return {
      found: triple81,
      count: count,
      is243: count >= 3,
      status: count >= 3 ? "243 erreicht" : `${count}/3 × 81 gefunden`
    };
  },

  // ═══════════════════════════════════════════
  // 2. PQ-Root berechnen
  // ═══════════════════════════════════════════
  pqRoot(value) {
    if (typeof value === "number") {
      return Math.floor(Math.sqrt(value * value + 243) / 3);
    }
    return 0;
  },

  // ═══════════════════════════════════════════
  // 3. STATIONS-ZUSTAND in % messen
  // ═══════════════════════════════════════════
  stationStatus(stationData) {
    // stationData = { name, values: [...], uptime, errors, load, ... }

    const defaults = {
      uptime: 0.8,      // 0-1
      errors: 0,        // Anzahl
      load: 0.5,        // 0-1
      signal: 0.9,      // 0-1
      response: 0.85,   // 0-1
      sync: 0.7,        // 0-1
    };

    const data = { ...defaults, ...stationData };

    // Gewichtung der Faktoren
    const weights = {
      uptime: 0.30,
      signal: 0.20,
      response: 0.20,
      sync: 0.15,
      load: 0.10,
      errors: 0.05
    };

    // Fehler-Penalty
    const errorPenalty = Math.min(data.errors * 0.05, 0.5);

    // Berechne Prozentwert
    let score = 0;
    score += data.uptime * weights.uptime;
    score += data.signal * weights.signal;
    score += data.response * weights.response;
    score += data.sync * weights.sync;
    score += (1 - data.load) * weights.load;
    score -= errorPenalty;

    // Normalisiere auf 0-100%
    const percent = Math.max(0, Math.min(100, Math.round(score * 100)));

    // Klassifikation
    let status = "Kritisch";
    if (percent >= 90) status = "Exzellent";
    else if (percent >= 75) status = "Gut";
    else if (percent >= 50) status = "Mittel";
    else if (percent >= 30) status = "Schwach";
    else status = "Kritisch";

    return {
      station: data.name || "Unbekannt",
      percent,
      status,
      details: {
        uptime: Math.round(data.uptime * 100) + "%",
        signal: Math.round(data.signal * 100) + "%",
        response: Math.round(data.response * 100) + "%",
        sync: Math.round(data.sync * 100) + "%",
        load: Math.round(data.load * 100) + "%",
        errors: data.errors
      }
    };
  },

  // ═══════════════════════════════════════════
  // 4. KOMPLETTE AUSWERTUNG
  // ═══════════════════════════════════════════
  evaluate(input, stationData = {}) {
    const find = this.find81(input);
    const status = this.stationStatus(stationData);

    // Welche 243 begünstigt diese Station?
    const beneficial = [];
    if (find.count >= 1) beneficial.push("81 gefunden → 243-Basis");
    if (status.percent >= 75) beneficial.push("Stations-Qualität hoch → 243 begünstigt");
    if (find.is243) beneficial.push("VOLLE 243 erreicht");

    return {
      input,
      find81: find,
      station: status,
      beneficial,
      summary: `Station ${status.station}: ${status.percent}% – ${status.status} | 81-Findung: ${find.count}/3`,
      timestamp: Date.now()
    };
  }
};
