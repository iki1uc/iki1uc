// pipeline/operator/pre_cache.js
// CACHE_WARMUP: SOURCE=ROM → SHADOW=CACHE

export function CACHE_WARMUP(config, ROM, CACHE) {

    const SOURCE = config?.SOURCE || "ROM";
    const SHADOW = config?.SHADOW || "CACHE";

    // === 1. ROM-Daten laden ===
    const romData = ROM?.read ? ROM.read() : null;

    const ROM_BLOCK = {
        id: "ROM",
        loaded: !!romData,
        data: romData || {},
        stable: romData !== null
    };

    // === 2. SHADOW-CACHE vorbereiten ===
    const CACHE_BLOCK = {
        id: "CACHE",
        warmed: false,
        entries: []
    };

    // === 3. Warmup durchführen ===
    if (ROM_BLOCK.loaded) {
        CACHE_BLOCK.entries = Object.entries(ROM_BLOCK.data).map(([key, value]) => ({
            key,
            shadow: value,
            t: Date.now()
        }));
        CACHE_BLOCK.warmed = true;
    }

    // === 4. Finaler Warmup-Output ===
    return {
        route: "CACHE_WARMUP",
        timestamp: Date.now(),
        SOURCE,
        SHADOW,
        ROM_BLOCK,
        CACHE_BLOCK,
        ready: ROM_BLOCK.stable && CACHE_BLOCK.warmed
    };
}
