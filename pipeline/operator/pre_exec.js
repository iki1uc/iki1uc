// pipeline/operator/pre_exec.js
// EXEC_INIT: CACHE=ROOT, GPU/CPU/RAM = RAW.HW.*

export function EXEC_INIT(config, HW) {

    const CACHE = config?.CACHE || "ROOT";
    const GPU   = config?.GPU   || HW?.GPU || null;
    const CPU   = config?.CPU   || HW?.CPU || null;
    const RAM   = config?.RAM   || HW?.RAM || null;

    // === 1. CACHE ROOT aktivieren ===
    const CACHE_ROOT = {
        id: "ROOT",
        active: true,
        warmed: true,
        stable: true
    };

    // === 2. RAW/HW Komponenten erfassen ===
    const HW_BLOCK = {
        GPU: {
            id: "RAW.HW.GPU",
            load: GPU?.load ?? 0,
            temp: GPU?.temp ?? 0,
            ready: GPU?.ready === true
        },
        CPU: {
            id: "RAW.HW.CPU",
            load: CPU?.load ?? 0,
            temp: CPU?.temp ?? 0,
            ready: CPU?.ready === true
        },
        RAM: {
            id: "RAW.HW.RAM",
            size: RAM?.size ?? 0,
            used: RAM?.used ?? 0,
            ready: RAM?.ready === true
        }
    };

    // === 3. EXEC Warmup durchführen ===
    const EXEC = {
        dispatch: HW_BLOCK.CPU.ready && HW_BLOCK.GPU.ready,
        memory_ok: HW_BLOCK.RAM.ready,
        cache_ok: CACHE_ROOT.stable,
        warmed: false
    };

    if (EXEC.dispatch && EXEC.memory_ok && EXEC.cache_ok) {
        EXEC.warmed = true;
    }

    // === 4. Finaler EXEC_INIT Block ===
    return {
        route: "EXEC_INIT",
        timestamp: Date.now(),
        CACHE_ROOT,
        HW_BLOCK,
        EXEC,
        ready: EXEC.warmed
    };
}
