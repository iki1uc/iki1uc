// pipeline/operator/pre_temporal.js
// TEMPORAL_DECODE: tmp lanes + HDF + TRIANGLE-form

export function TEMPORAL_DECODE(config, FRAME, HDF) {

    const MODE = config?.MODE || "tmp";
    const USE_HDF = config?.HDF === true;

    // === 1. tmp lanes vorbereiten ===
    const TMP = {
        lanes: 2,
        forward: [],
        reverse: [],
        active: true
    };

    // === 2. TRIANGLE-Form anwenden ===
    const TRIANGLE = {
        SYN: FRAME?.syn ?? 0,
        FLX: FRAME?.flx ?? 0,
        VEC: FRAME?.vec ?? 0
    };

    // === 3. HDF tmp layer nutzen ===
    const HDF_TMP = USE_HDF
        ? {
            size: Math.floor(HDF.size * 0.05),
            frame: FRAME,
            stable: true
        }
        : null;

    // === 4. Ursache → Wirkung (forward)
    TMP.forward.push({
        syn: TRIANGLE.SYN + 1,
        flx: TRIANGLE.FLX,
        vec: TRIANGLE.VEC + 1,
        t: Date.now()
    });

    // === 5. Wirkung → Ursache (reverse)
    TMP.reverse.push({
        syn: TRIANGLE.SYN - 1,
        flx: TRIANGLE.FLX,
        vec: TRIANGLE.VEC - 1,
        t: Date.now()
    });

    return {
        route: "TEMPORAL_DECODE",
        MODE,
        TRIANGLE,
        TMP,
        HDF_TMP,
        ready: true
    };
}
