import { WHIRL_SYS } from "./WHIRL.SYS";

export function RESPO_WHIRL(truth){

  const whirl = WHIRL_SYS.build(truth);

  truth.pqHistory.push(whirl);
  truth.respoLog.push(whirl);
  truth.ncLog.push(whirl);

  truth.tmpAxis = truth.time6d.vector;

  return whirl;
}
