// ===============================
// NC-ENGINE · 6 NC-Formen
// ===============================

function NC_engine(Phi, phi, phi2, phiinfty){

    const base = ghost5E(Phi, phi, phi2, phiinfty);

    return {

        // NC1 – Linear
        NC1: {
            name: "Linear",
            value: Phi + phi,
            M5: base.M5,
            G: base.G_total
        },

        // NC2 – Quadratisch
        NC2: {
            name: "Quadratisch",
            value: (Phi * phi2),
            stabil: base.lage.stabil,
            evo: base.orbit.evo
        },

        // NC3 – Rekursiv
        NC3: {
            name: "Rekursiv",
            value: phi * phi,
            ghost: base.status,
            radius: base.orbit.radius
        },

        // NC4 – Unendlichkeits-Projektion
        NC4: {
            name: "Unendlichkeits-Projektion",
            value: phiinfty * Phi,
            weite: base.operatoren.raster,
            evo: base.orbit.evo
        },

        // NC5 – Dominanz
        NC5: {
            name: "Dominanz",
            value: Phi - phi,
            bewegung: base.operatoren.bewegung,
            stabilitaet: base.operatoren.stabilitaet
        },

        // NC6 – Herrschaftsgrad
        NC6: {
            name: "Herrschaft",
            value: base.M5 * 12.5,
            lage: base.lage,
            ghost: base.status
        }
    };
}

// =====================================
// NC-KÖRPER-ENGINE · 9 Körper × 3 Achsen
// =====================================

const NC_KOERPER = {
    AH:  { ax: [1, 0.5, 0.2] },
    HA:  { ax: [0.8, 0.3, 0.9] },
    ÄH:  { ax: [0.4, 0.7, 0.1] },
    HÄ:  { ax: [0.6, 0.9, 0.3] },
    Q1:  { ax: [0.2, 0.8, 0.5] },
    Q2:  { ax: [0.9, 0.4, 0.6] },
    Q3:  { ax: [0.3, 0.2, 0.7] },
    Q4:  { ax: [0.7, 0.6, 0.4] },
    NC:  { ax: [1.0, 1.0, 1.0] } // Zentrum
};

// 3-Achsen-Abfrage + Antwort + Spiegelung
function NC_abfrage(name){
    const k = NC_KOERPER[name];
    if(!k) return null;

    const [Phi, phi, phi2] = k.ax;
    const phiinfty = (Phi + phi + phi2) / 3; // diagonale Projektion

    const ghost = ghost5E(Phi, phi, phi2, phiinfty);

    return {
        name,
        achsen: { Phi, phi, phi2, phiinfty },
        ghost,
        lage: ghost.lage,
        spiegel: {
            x: -ghost.lage.x,
            y: -ghost.lage.y,
            z: -ghost.lage.z
        }
    };
}
