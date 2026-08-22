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
