export const THREEHOCH3 = {

    station: "3hoch3",
    dim: 27,
    type: "energy-matrix",
    energy: true,

    // NCROM-Layer
    layer: "NCROM-INDUSTRY",
    mode: "ULTRA-U",

    // Verbindungen zu den gekrümmten Stationen
    connect(){
        return ["3x3", "9x9", "81"];
    },

    // Orbit-Kern (27D → 6E)
    orbit(){
        return {
            root: "ULTRA-NC3x3.room",
            tensor: "ULTRA-NC9x9.room",
            nc: "81.room",
            use: "6E-optimization"
        };
    },

    // Energie-Faltung
    fold(){
        return 27 / 3; // 9D Rückfaltung
    },

    // Energie-Expansion
    expand(){
        return 27 * 3; // 81D Expansion
    }
};
