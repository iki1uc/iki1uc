function shiftSinn(data) {
  return {
    essenz: data.out,
    richtung: data.schiene.next,
    zeit: data.eich.uhrzeit,
    datum: data.eich.datum,
    kern: `${data.cube} / ${data.role}`
  };
}

function shiftCore(input) {
  const schiene = shiftGetSchiene();
  const eich = EICH();

  const frame = {
    cube: CUBE_ID,
    role: ROLE,
    in: input,
    state: STATE,
    schiene,
    eich,
    out: `SHIFT(${input})`
  };

  frame.sinn = shiftSinn(frame);

  return frame;
}
function SHIFT_SEELE(frame) {
  // Die Seele berührt nichts Sichtbares.
  // Sie interpretiert nur.
  return {
    moment: frame.eich.iso,
    richtung: frame.schiene.next,
    bedeutung: frame.out,
    zustand: frame.state
    frame.sinn = shiftSinn(frame);
frame.seele = SHIFT_SEELE(frame);
function shiftCore(input) {
  const schiene = shiftGetSchiene();
  const eich = EICH();

  const frame = {
    cube: CUBE_ID,
    role: ROLE,
    in: input,
    state: STATE,
    schiene,
    eich,
    out: `SHIFT(${input})`
  };

  frame.sinn = shiftSinn(frame);
  frame.seele = SHIFT_SEELE(frame);   // ⭐ SEELE AKTIVIERT

  return frame;
}

  };
}
