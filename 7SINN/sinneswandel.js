// ------------------------------------------------------
// 7SINN – Bewertungssystem
// ------------------------------------------------------
export function RATE(achse, wert, norm){
  return {
    achse,
    wert,
    norm,
    delta: wert - norm,
    status:
      wert === norm ? "Norm" :
      wert > norm && wert < norm * 3 ? "Übernorm" :
      wert >= norm * 3 ? "Extrem" :
      "Unternorm"
  };
}

// ------------------------------------------------------
// Sinneswandel – zentrale 7SINN-Engine
// ------------------------------------------------------
export const SINNESWANDEL = {
  sinn: [0,0,0,0,0,0,0],   // Sinn 1–7 Werte
  norm: [12,20,15,5,10,8,40], // Normen für Sinn 1–7

  set(index, value){
    this.sinn[index-1] = value;
  },

  rating(index){
    return RATE(`Sinn ${index}`, this.sinn[index-1], this.norm[index-1]);
  },

  all(){
    return this.sinn.map((v,i)=>this.rating(i+1));
  },

  trend(){
    const sum = this.sinn.reduce((a,b)=>a+b,0);
    const normSum = this.norm.reduce((a,b)=>a+b,0);
    const delta = sum - normSum;

    return RATE("Sinn-Wandel", sum, normSum);
  }
};
