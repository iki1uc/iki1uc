// error_interpret.js
window.SEEU_ERROR_INTERPRET = function(input){
  const D = {
    mech: ["3x6","3x9","PI-3x9","P-3xX"],
    cmp: ["3x4","3x1","parse3x1"],
    time: ["TIME-3x11","TIME-3x10","TIME-3x5"],
    meta: ["3x13","3x12","3x11","3x10"],
    op: ["AXXX","3x3","3x2","3x1"],
    rt: ["AXIS","borgProtocol"]
  };

  if (!/3x\d|TIME-3x|AXIS|borgProtocol/.test(input)) {
    return { status:"NO_3X", raw:input };
  }

  const parts = input.split("+").map(s=>s.trim());
  const found = [];

  for (const p of parts){
    let ok = false;
    for (const key in D){
      if (D[key].includes(p)){
        found.push(key);
        ok = true;
      }
    }
    if (!ok){
      return { status:"DEFECT", reason:"UNKNOWN_ELEMENT", element:p };
    }
  }

  const unique = [...new Set(found)];
  if (unique.length === 1){
    const d = unique[0].toUpperCase();
    return {
      status:"OK",
      discipline:d,
      messID:d+"-ID-X",
      method:d+"-PROTO"
    };
  }

  return { status:"DEFECT", reason:"MIXED_DISCIPLINES", disciplines:unique };
};

