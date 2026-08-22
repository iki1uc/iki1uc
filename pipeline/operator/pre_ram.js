// pipeline/operator/pre_ram.js
// RAM_WARMUP: optimiert für 32GB DDR4 + HDF tmp layer

export function RAM_WARMUP(config, RAM) {

    const MODE = config?.MODE || "parallel";
    const USE_HDF = config?.HDF === true;

    // === 1. RAM-Status erfassen ===
    const STATUS = {
        id: RAM?.id || "RAW.HW.RAM",
        size: RAM?.size ?? 0,
        used: RAM?.used ?? 0,
        speed: RAM?.speed ?? 2400,
        ready: RAM?.ready === true
    };

    // === 2. Parallel-Lanes vorbereiten ===
    const LANES = {
        mode: MODE,
        count: MODE === "parallel" ? 2 : 1,
        warmed: false,
        queue: []
    };

    // === 3. HDF tmp layer vorbereiten ===
    const HDF_TMP = USE_HDF
        ? {
            active: true,
            frame: {
                size: Math.floor(STATUS.size * 0.10), // 10% RAM als tmp-HDF
                t: Date.now(),
                stable: true
            }
        }
        : {
            active: false
        };

    // === 4. Warmup durchführen ===
    if (STATUS.ready) {

        // Lane 0: Memory-Boost
        LANES.queue.push({
            lane: 0,
            boost: STATUS.speed + 200, // DDR4-OC-Potential
            t: Date.now()
        });

        // Lane 1: HDF-Boost (nur wenn aktiv)
        if (MODE === "parallel" && USE_HDF) {
            LANES.queue.push({
                lane: 1,
                boost: HDF_TMP.frame.size,
                t: Date.now()
            });
        }

        LANES.warmed = true;
    }

    // === 5. Finaler Output ===
    return {
        route: "RAM_WARMUP",
        timestamp: Date.now(),
        MODE,
        STATUS,
        LANES,
        HDF_TMP,
        ready: STATUS.ready && LANES.warmed
    };
}
