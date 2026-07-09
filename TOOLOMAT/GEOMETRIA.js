/* ============================================================
   GEOMETRIA.js – Achsenmotor für iki1uc / RESPO / LAGE / GHOST
   ============================================================ */

/* ============================
   1. Q‑Achsen (Q1–Q4)
   ============================ */

function Q1(Phi) {
    return Phi; // Verhältnisbildung (IKI)
}

function Q2(phi) {
    return phi; // Rekursion (BIR)
}

function Q3(phi2) {
    return phi2; // Quadratur (UC)
}

function Q4(phiinfty) {
    return phiinfty; // Unendlichkeit (MA³)
}


/* ============================
   2. Präsentationsmaß M₅
   ============================ */

function M5(Phi, phi, phi2, phiinfty) {
    return (Phi + phi + phi2 + phiinfty) / 4;
}


/* ============================
   3. Rein/Raus‑Bewegung
   ============================ */

function G_in(Phi, phi) {
    return (Phi + phi) / 2;
}

function G_out(phi2, phiinfty) {
    return (phi2 + phiinfty) / 2;
}

function G_total(Phi, phi, phi2, phiinfty) {
    return G_out(phi2, phiinfty) - G_in(Phi, phi);
}


/* ============================
   4. 3D‑Cube‑Projektion
   ============================ */

function cubeTransform(Phi, phi, phi2, phiinfty) {

    const g = G_total(Phi, phi, phi2, phiinfty);
    const m = M5(Phi, phi, phi2, phiinfty);

    return {
        translateZ: 100 + g * 20,     // Rein/Raus
        rotateX: m * 15,              // M₅‑Rotation
        rotateY: phi * 10,            // Orbit
        scale: 1 + (phi2 / 10)        // Quadratur‑Skalierung
    };
}


/* ============================
   5. NC‑Validierung
   ============================ */

function NC_check(code) {
    return code === "36E"; // dein CaptScha‑Code
}


/* ============================
   6. Operatoren‑Mapping (Schach)
   ============================ */

function operatorenMap(phi2) {
    return {
        bewegung: phi2 * 2,
        stabilitaet: phi2,
        raster: Math.round(phi2 * 4)
    };
}


/* ============================
   7. Orbit‑Mapping (Skat)
   ============================ */

function orbitMap(phi) {
    return {
        speed: phi * 3,
        radius: 50 + phi * 10,
        evo: phi * 1.5
    };
}


/* ============================
   8. LAGE‑Integration
   ============================ */

function lagePosition(Phi, phi, phi2, phiinfty) {
    return {
        x: Phi * 10,
        y: phi * 10,
        z: phiinfty * 10,
        stabil: phi2
    };
}


/* ============================
   9. GHOST‑5E‑Auswertung
   ============================ */

function ghost5E(Phi, phi, phi2, phiinfty) {

    const m = M5(Phi, phi, phi2, phiinfty);
    const g = G_total(Phi, phi, phi2, phiinfty);

    return {
        M5: m,
        G_total: g,
        status:
            g > 0 ? "Expansion" :
            g < 0 ? "Kontraktion" :
                    "Stabil",
        orbit: orbitMap(phi),
        operatoren: operatorenMap(phi2),
        lage: lagePosition(Phi, phi, phi2, phiinfty)
    };
}


/* ============================
   10. Export
   ============================ */

export {
    Q1, Q2, Q3, Q4,
    M5,
    G_in, G_out, G_total,
    cubeTransform,
    NC_check,
    operatorenMap,
    orbitMap,
    lagePosition,
    ghost5E
};
