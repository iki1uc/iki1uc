// =====================================================
// RESPO-S EXPO – 3^9^81 bevorzugt
// =====================================================

function RESPO_S_EXPO(){
    const base = 3;      // Synthese
    const mid  = 9;      // Synthese²
    const top  = 81;     // Synthese³ (MAX-S)

    return {
        BASIS: base,
        MITTE: mid,
        GIPFEL: top,

        EXPO: Math.pow(base, Math.pow(mid, top)),   // 3^(9^81)
        PRIORITÄT: "MAX-S",
        MOVE: "linear-synthese",
        EBENE: 3,
        SIGNAL: "grün"
    };
}
