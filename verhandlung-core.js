/*  
  調停コア – verhandlung-core.js  
  -----------------------------------------
  日本の静けさ。  
  Une touche française, seulement si utile.  
  Le reste reste simple, humble, efficace.
*/

// 6 Formen – 基本形
const Formen = {
  QI:    "QI",
  ORBIT: "ORBIT",
  OP:    "OP",
  EVO:   "EVO",
  NC:    "NC",
  CO:    "CO"
};

// 分子生成 – Naissance d’un molécule
function MolekuelGeburt(A, B, C) {

  // 初期状態 – état initial
  const M = {
    items: [A, B, C],
    marker: ["MOL"],
    state: Formen.QI
  };

  // 静かな流れ – le flux tranquille
  M.state = Formen.ORBIT;
  M.state = Formen.OP;
  M.state = Formen.EVO;
  M.state = Formen.NC;
  M.state = Formen.CO;

  return M;
}

// 公開 – Export
window.MolekuelGeburt = MolekuelGeburt;
