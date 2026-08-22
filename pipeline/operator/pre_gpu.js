// pipeline/operator/pre_u.js
// U_WARMUP: MODE = parallel
// Universelle Warmup‑Stufe für KI‑Dispatch

export function U_WARMUP(config, UNIT) {

    const MODE = config?.MODE || "parallel";

    // === 1. RAW/HW UNIT Status erfassen ===
    const STATUS = {
        id: UNIT?.id || "RAW.HW.UNIT",
        load: UNIT?.load ?? 0,
        temp: UNIT?.temp ?? 0,
        ready: UNIT?.ready === true
    };

    // === 2. Parallel‑Warmup vorbereiten ===
    const PARALLEL = {
        lanes: MODE === "parallel" ? 2 : 1,
        queue: [],
        warmed: false
    };

    // === 3. Warmup durchführen ===
    if (STATUS.ready) {

        // Lane 0: Load‑Boost
        PARALLEL.queue.push({
            lane: 0,
            boost: STATUS.load + 1,
            t: Date.now()
        });

        // Lane 1: Temp‑Boost
        PARALLEL.queue.push({
            lane: 1,
            boost: STATUS.temp + 1,
            t: Date.now()
        });

        PARALLEL.warmed = true;
    }

    // === 4. Finaler Output ===
    return {
        route: "U_WARMUP",
        timestamp: Date.now(),
        MODE,
        STATUS,
        PARALLEL,
        ready: STATUS.ready && PARALLEL.warmed
    };
}
