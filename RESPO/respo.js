// RESPO.js – Response Kernel

export function respo(state) {
  // Erwartete Zustände aus respo.map oder respo.scan
  switch (state) {

    case "fix":
      return "ROOT";   // Rückkehr
    case "flow":
      return "FLOW";   // System fließt
    case "expand":
      return "OK";     // Zustimmung
    case "charge":
      return "ECHO";   // Spiegelung
    case "shield":
      return "VOID";   // Neutral
    case "release":
      return "BREAK";  // Abbruch

    default:
      return "NOK";    // Fehler / unbekannt
  }
}
