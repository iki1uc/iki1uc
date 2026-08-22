/* ============================
   11. Raumprofile (NEU)
   ============================ */

export const Raum = {
    cube: "CUBE",
    schach: "SCHACH",
    skat: "SKAT",
    respo: "RESPO",
    ghost: "GHOST"
};

/* ============================
   12. Raum-Achsen (NEU)
   ============================ */

export function raumAchse(raum, Phi, phi, phi2, phiinfty){

    switch(raum){

        case Raum.cube:
            return {
                x: Math.sin(Phi/3) * 81,
                y: Math.cos(phi/3) * 81,
                z: phiinfty * 27,
                stabil: phi2 * 3
            };

        case Raum.schach:
            return {
                x: Phi * 8,
                y: phi * 8,
                z: phi2 * 8,
                stabil: phiinfty
            };

        case Raum.skat:
            return {
                x: Math.sin(Phi) * 50,
                y: Math.cos(phi) * 50,
                z: phi2 * 5,
                stabil: phiinfty
            };

        case Raum.respo:
            return {
                x: Phi * 36,
                y: phi * 36,
                z: phi2 * 36,
                stabil: phiinfty
            };

        case Raum.ghost:
            return {
