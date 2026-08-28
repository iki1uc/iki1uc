export const Cubik4D = {
    P: null,
    A: null,
    M: null,
    O: null,
    S: null,   // Score-Dimension

    update(position, axes, movement, orbit, score) {
        this.P = position;
        this.A = axes;
        this.M = movement;
        this.O = orbit;
        this.S = score;
    }
};
function scoreRespo(respo){
  const confs = respo.confs || [0.5,0.5,0.5];
  const e = evalRespo(confs, respo.QI || defaultQI, respo.IQQ || defaultIQQ);
  const axis = axisCoverage(respo.text||'');
  const geom = { theta: 2*Math.PI*e.arg3te, rho: 50 + 150*axis };
  const final = 0.6*e.arg3te + 0.4*axis;
  return Object.assign({}, respo, e, { axis, geom, final });
}
import { scoreRespo } from "./respo.js";
sendToCubik(matrix){
    const pos = matrix[4][4];
    const axes = AXES.fullMatrix();
    const movement = FLOW.vector();
    const orbit = ORBIT.state();

    const respo = scoreRespo({
        confs: [pos.val, movement.mag, orbit.level],
        text: JSON.stringify(pos)
    });

    updateTmp(pos, axes, movement, orbit);
    Cubik4D.update(pos, axes, movement, orbit, respo.final);
}
