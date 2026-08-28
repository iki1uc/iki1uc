// AXIOMIAT · mind-engine (iki1uc)

export const AXIOMIAT = {

  origin: "iki1uc",
  state: "fluid",
  cache: true,
  ready: true,

  // Goldener Schnitt
  PHI: (1 + Math.sqrt(5)) / 2,

  // Default QI / IQQ
  QI: 0.65,
  IQQ: 0.35,

  // Axiomatische Achsen
  axes: [
    {name:'conceptual', keywords:['theory','idea','concept','axiom']},
    {name:'technical', keywords:['code','implementation','api','function']},
    {name:'repro', keywords:['example','reproduce','dataset','script','seed']},
    {name:'usability', keywords:['guide','readme','usage','install']},
    {name:'privacy', keywords:['email','personal','pii','secret','key']},
    {name:'performance', keywords:['perf','speed','optimiz']},
    {name:'tests', keywords:['test','unit','assert','expected']},
    {name:'ethics', keywords:['ethic','bias','impact']},
    {name:'integration', keywords:['integrate','api','plugin','module']}
  ],

  // Axiomatische Bewertung
  eval(confArr, QI=0.65, IQQ=0.35) {
    const base = confArr.reduce((a,b)=>a+b,0)/confArr.length;
    const maxc = Math.max(...confArr), minc = Math.min(...confArr);
    const variance = maxc - minc;
    const combined = Math.max(0, Math.min(1, QI*base + (1 - IQQ)*maxc));
    const arg3te = +(combined * (1 - variance)).toFixed(6);
    return { base, maxc, minc, variance, arg: combined, xarg: variance, arg3te };
  },

  // Axiomatische Achsenabdeckung
  coverage(text){
    const t = (text||'').toLowerCase();
    let matched=0;
    for(const a of this.axes){
      for(const k of a.keywords){
        if(t.includes(k)){ matched++; break; }
      }
    }
    return matched / this.axes.length;
  },

  // Orbit-Score
  score(respo){
    const confs = respo.confs || [0.5,0.5,0.5];
    const e = this.eval(confs, respo.QI || this.QI, respo.IQQ || this.IQQ);
    const axis = this.coverage(respo.text||'');
    const geom = { theta: 2*Math.PI*e.arg3te, rho: 50 + 150*axis };
    const final = 0.6*e.arg3te + 0.4*axis;
    return Object.assign({}, respo, e, { axis, geom, final });
  },

  // Orbit-Engine
  orbit: {
    FRAME_MS: 16,
    ANIM_SPEED: 0.8,
    JUGGLE_MS: 1800,
    PLOT_LIMIT: 200,
    DEBOUNCE_MS: 50,
    BATCH_SIZE: 9,
    processIndex: 0
  }
};
