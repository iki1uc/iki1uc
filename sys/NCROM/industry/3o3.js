function cubikRAM(node){
  const B = node.B;
  const H = node.H;

  // Axiom 1 & 2: Breite/Höhe angleichen
  const BH = Math.max(B, H);

  // Axiom 3: Tiefe angleichen
  const T = BH;

  return {
    B: BH,
    H: BH,
    T: T,
    mode: "CUBIK-RAM-GPU",
    axiom: ["B","H","T"],
    tmp_loop: true
  };
}
