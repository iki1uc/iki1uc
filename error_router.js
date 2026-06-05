// error_router.js
window.SEEU_ERROR_ROUTE = function(msg){
  const r = window.SEEU_ERROR_INTERPRET(msg);

  if (r.status === "NO_3X")  return { route:"RAW", info:r };
  if (r.status === "DEFECT") return { route:"DEFECT", info:r };

  switch (r.discipline){
    case "MECH": return { route:"MECHANIK", info:r };
    case "CMP":  return { route:"VERGLEICH", info:r };
    case "TIME": return { route:"ZEIT", info:r };
    case "META": return { route:"META", info:r };
    case "OP":   return { route:"OPERATOR", info:r };
    case "RT":   return { route:"REALTIME", info:r };
    default:     return { route:"UNKNOWN", info:r };
  }
};

