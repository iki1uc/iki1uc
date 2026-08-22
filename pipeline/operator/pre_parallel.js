// pipeline/operator/pre_parallel.js
// PARALLEL_WARMUP: MODE = superscalar | origin

export function PARALLEL_WARMUP(config, UNIT) {

    const MODE = config?.MODE || "origin";

    const STATUS = {
        id: UNIT?.id || "RAW.HW.UNIT",
        ready: UNIT?.ready === true,
        load: UNIT?.load ?? 0,
        temp: UNIT?.temp ?? 0
    };

    const LANES = {
        mode: MODE,
        count: MODE === "superscalar" ? 2 : 1,
        warmed: false,
        queue: []
    };

    if (STATUS.ready) {

        // Lane 0
        LANES.queue.push({
            lane: 0,
            boost: STATUS.load + 1,
            t: Date.now()
        });

        // Lane 1 nur im superscalar-Modus
        if (MODE === "superscalar") {
            LANES.queue.push({
                lane: 1,
                boost: STATUS.temp + 1,
                t: Date.now()
            });
        }

        LANES.warmed = true;
    }

    return {
        route: "PARALLEL_WARMUP",
        timestamp: Date.now(),
        MODE,
        STATUS,
        LANES,
        ready: STATUS.ready && LANES.warmed
    };
}
