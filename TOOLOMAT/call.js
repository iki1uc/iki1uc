/* ============================================================
   CALL.js – Dispatcher für GEOMETRIA / RESPO / LAGE / GHOST
   ============================================================ */

import {
    lagePosition,
    cubeTransform,
    ghost5E,
    raumAchse,
    Raum
} from "./GEOMETRIA.js";

/* ============================
   1. Universeller 6D‑CALL
   ============================ */

export function CALL6D(raum, Phi, phi, phi2, phiinfty) {

    const lage = lagePosition(Phi, phi, phi2, phiinfty);
    const achse = raumAchse(raum, Phi, phi, phi2, phiinfty);
    const ghost = ghost5E(Phi, phi, phi2, phiinfty);

    return {
        raum,
        lage,
        achse,
        ghost,
        status: ghost.status
    };
}

/* ============================
   2. Raum-spezifische Calls
   ============================ */

export function CALL_CUBE(Phi, phi, phi2, phiinfty){
    return CALL6D(Raum.cube, Phi, phi, phi2, phiinfty);
}

export function CALL_SCHACH(Phi, phi, phi2, phiinfty){
    return CALL6D(Raum.schach, Phi, phi, phi2, phiinfty);
}

export function CALL_SKAT(Phi, phi, phi2, phiinfty){
    return CALL6D(Raum.skat, Phi, phi, phi2, phiinfty);
}

export function CALL_RESPO(Phi, phi, phi2, phiinfty){
    return CALL6D(Raum.respo, Phi, phi, phi2, phiinfty);
}

export function CALL_GHOST(Phi, phi, phi2, phiinfty){
    return CALL6D(Raum.ghost, Phi, phi, phi2, phiinfty);
}

/* ============================
   3. Dispatcher
   ============================ */

export function CALL(raum, Phi, phi, phi2, phiinfty){
