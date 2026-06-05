// error_visual.js
window.SEEU_ERROR_VISUAL = function(msg, target){
  const r = window.SEEU_ERROR_ROUTE(msg);
  let out = "=== SEEu‑error ===\n\n";
  out += "Fehler:\n  " + msg + "\n\n";

  if (r.route === "RAW"){
    out += "Kein 3×X‑Muster erkannt.\n";
    target.textContent = out;
    return;
  }

  if (r.route === "DEFECT"){
    out += "3×X‑Fehler (DEFECT):\n";
    out += "  Grund: " + r.info.reason + "\n";
    if (r.info.element) out += "  Element: " + r.info.element + "\n";
    target.textContent = out;
    return;
  }

  out += "3×X‑Abbildung:\n";
  out += "  Disziplin: " + r.info.discipline + "\n";
  out += "  Mess‑ID:   " + r.info.messID + "\n";
  out += "  Methodik:  " + r.info.method + "\n";
  out += "  Routing:   " + r.route + "\n";

  target.textContent = out;
};

