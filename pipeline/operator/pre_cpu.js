// pipeline/operator/pre_cpu.js
// CPU_WARMUP: MODE = dispatch

export function CPU_WARMUP(config, CPU) {

    const MODE = config?.MODE || "dispatch";

    // === 1. CPU‑Status erfassen ===
    const STATUS = {
        id: CPU?.id || "CPU_CORE",
        load: CPU?.load ?? 0,
        temp: CPU?.temp ?? 0,
        ready: CPU?.ready === true
    };

    // === 2. Dispatch‑Warmup ===
    const DISPATCH = {
        lanes: MODE === "dispatch" ? 2 : 1,
        queue: [],
        warmed: false
    };

    // === 3. Warmup durchführen ===
    if (STATUS.ready) {
        DISPATCH.queue.push({
            t: Date.now(),
            lane: 0,
            boost: STATUS.load + 1
        });
        DISPATCH.queue.push({
            t: Date.now(),
            lane: 1,
            boost: STATUS.temp + 1
        });
        DISPATCH.warmed = true;
    }

    // === 4. Finaler CPU‑Warmup‑Block ===
    return {
        route: "CPU_WARMUP",
        timestamp: Date.now(),
        MODE,
        STATUS,
        DISPATCH,
        ready: STATUS.ready && DISPATCH.warmed
    };
}
