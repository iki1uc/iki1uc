/* ============================================================
   LEITUNG.js – Die Leitung & Eine Leitung für iki1uc
   Zentralmotor für GEOMETRIA / RESPO / LAGE / GHOST / SPIEL
   ============================================================ */

import {
    lagePosition,
    ghost5E,
    raumAchse,
    Raum
} from "./GEOMETRIA.js";

/* ============================
   1. Eine Leitung (Instanz)
   ============================ */

export class Leitung {

    constructor(raum){
        this.raum = raum;        // Cube, Schach, Skat, Time, RESPO, GHOST
        this.last = null;        // letzte Lage
        this.status = "init";    // Zustand
    }

    /* ----------------------------
       6D‑Signal durch die Leitung
       ---------------------------- */
    signal(Phi, phi, phi2, phiinfty){

        const lage  = lagePosition(Phi, phi, phi2, phiinfty);
        const achse = raumAchse(this.raum, Phi, phi, phi2, phiinfty);
        const ghost = ghost5E(Phi, phi, phi2, phiinfty);

        this.last = { lage, achse, ghost };
        this.status = ghost.status;

        return this.last;
    }
}

/* ============================
   2. Die Leitung (Singleton)
   ============================ */

export const DIE_LEITUNG = {

    /* ----------------------------
       Raum‑Router
       ---------------------------- */
    call(raum, Phi, phi, phi2, phiinfty){

        const instanz = new Leitung(raum);
        return instanz.signal(Phi, phi, phi2, phiinfty);
    },

    /* ----------------------------
       Direkt‑Calls für Räume
       ---------------------------- */
    cube(Phi, phi, phi2, phiinfty){
        return this.call(Raum.cube, Phi, phi, phi2, phiinfty);
    },

    schach(Phi, phi, phi2, phiinfty){
        return this.call(Raum.schach, Phi, phi, phi2, phiinfty);
    },

    skat(Phi, phi, phi2, phiinfty){
        return this.call(Raum.skat, Phi, phi, phi2, phiinfty);
    },

    respo(Phi, phi, phi2, phiinfty){
        return this.call(Raum.respo, Phi, phi, phi2, phiinfty);
    },

    ghost(Phi, phi, phi2, phiinfty){
        return this.call(Raum.ghost, Phi, phi, phi2, phiinfty);
    }
};
