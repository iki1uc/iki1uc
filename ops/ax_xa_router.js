// ops/ax_xa_router.js
// AXIOM ROUTER: AX → XA → AX
// Bildungs-Kontrolle 3 → 9 → 81 aktiv

import { BILDUNG_CONTROL } from "../control/bildung.control.js";

export function AX_XA_ROUTER(AX) {

    // === 1. Bildungs-Kontrolle durchführen ===
    const bildung = BILDUNG_CONTROL({
        value: AX?.value ?? 0
    });

    // === 2. AX → XA Transformation ===
    const XA = {
        id: AX?.id || "AX",
        mode: "XA",
        core: AX?.core || "none",
        flow: AX?.flow || "neutral",
        factor: bildung.lvl9.factor,
        stable: bildung.lvl9.ok
    };

    // === 3. XA → AX Rückführung ===
    const AX_out = {
        id: XA.id,
        mode: "AX",
        core: XA.core,
        flow: XA.flow,
        amplify: bildung.lvl81.power,
        stable: bildung.lvl81.ok
    };

    // === 4. Finaler Router-Output ===
    return {
        route: "AX_XA_ROUTER",
        timestamp: Date.now(),
        AX_in: AX,
        XA_mid: XA,
        AX_out,
        bildung,
        ready: bildung.stable
    };
}
