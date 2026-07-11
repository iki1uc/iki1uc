// =====================================================
// RAUM-ID KERNEL (NEU)
// =====================================================

// ------------------------------
// GHOST_SCAN_REAL
// ------------------------------
function GHOST_SCAN_REAL(r){
    if(r.MISS === true){
        return {
            ...r,
            ERROR: true,
            RESULT: "MISS",
            WAHRHEIT: false
        };
    }

    const result = (r.STATUS === "REAL") ? r.IST : r.NEU;

    return {
        ...r,
        RESULT: result,
        WAHRHEIT: (result === r.IST),
        ERROR: false
    };
}

// ------------------------------
// RAUM_KERNEL
// ------------------------------
function RAUM_KERNEL(raum){
    const ID = {
        ZUG: raum.ZUG,
        BLATT: raum.BLATT,
        STATUS: raum.STATUS,
        LEGO: raum.LEGO,
        TETRIZ: raum.TETRIZ,
        ARG: raum.ARG
    };

    const DATE = {
        IST: raum.IST,
        SOLL: raum.SOLL,
        NEU: raum.NEU,
        IST2: raum.IST2,
        SOLL2: raum.SOLL2
    };

    raum.RESULT = (raum.STATUS === "REAL") ? raum.IST : raum.NEU;

    return { ID, DATE, ...raum };
}

// ------------------------------
// MOVE
// ------------------------------
function MOVE(raum){
    if(raum.STATUS === "REAL") return raum.IST;
    if(raum.STATUS === "TMP") return raum.NEU;
    return null;
}

// ------------------------------
// Export
// ------------------------------
console.log("RAUM-ID Kernel geladen.");
