// ops/xa_out.js
// XA_OUT: OUTPUT(iki1uc.core, iki1uc.space)
// Finalisierung des AX↔XA Routers

export function XA_OUT(routerPacket, core, space) {

    // === 1. Sicherheitsprüfung ===
    const valid =
        routerPacket &&
        routerPacket.AX_out &&
        routerPacket.bildung &&
        routerPacket.bildung.stable;

    // === 2. Output für iki1uc.core ===
    const CORE_OUT = {
        id: routerPacket.AX_out.id,
        amplify: routerPacket.AX_out.amplify,
        stable: routerPacket.AX_out.stable,
        bildung: routerPacket.bildung,
        core_status: core?.status || "unknown",
        core_mode: core?.mode || "none"
    };

    // === 3. Output für iki1uc.space ===
    const SPACE_OUT = {
        id: routerPacket.AX_out.id,
        vector: space?.vector || { x: 0, y: 0, z: 0 },
        field: space?.field || "neutral",
        amplify: routerPacket.AX_out.amplify,
        stable: routerPacket.AX_out.stable
    };

    // === 4. Finaler XA_OUT-Block ===
    return {
        route: "XA_OUT",
        timestamp: Date.now(),
        valid,
        AX_in: routerPacket.AX_in,
        XA_mid: routerPacket.XA_mid,
        AX_out: routerPacket.AX_out,
        CORE_OUT,
        SPACE_OUT,
        ready: valid
    };
}
