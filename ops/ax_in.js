// ops/ax_in.js
// AX_IN: INPUT(sys, tem, AU, RA)
// XyX Pattern aktiv

export function AX_IN(sys, tem, AU, RA) {

    // === 1. XyX Pattern erkennen ===
    const XyX = {
        left: sys?.X ?? 0,
        mid:  tem?.y ?? 0,
        right: sys?.X ?? 0,
        valid: (sys?.X !== undefined && tem?.y !== undefined)
    };

    // === 2. Systemdaten bündeln ===
    const SYS = {
        id: sys?.id || "none",
        mode: sys?.mode || "unknown",
        active: sys?.active === true
    };

    // === 3. Temperatur / Template ===
    const TEM = {
        y: tem?.y ?? 0,
        flow: tem?.flow ?? "none",
        stable: tem?.y >= 0 && tem?.y <= 100
    };

    // === 4. AU – Autorität / Auslöser ===
    const AUTH = {
        trigger: AU?.trigger || "none",
        level: AU?.level ?? 0,
        allow: AU?.level >= 3
    };

    // === 5. RA – Rückantwort / Rückkopplung ===
    const REACT = {
        feedback: RA?.feedback || "none",
        amplify: RA?.amp ?? 1,
        result: RA?.amp ? RA.amp * (tem?.y ?? 1) : 0
    };

    // === 6. Finaler AX_IN‑Output ===
    return {
        route: "AX_IN",
        timestamp: Date.now(),
        XyX,
        SYS,
        TEM,
        AUTH,
        REACT,
        ready:
            XyX.valid &&
            SYS.active &&
            TEM.stable &&
            AUTH.allow
    };
}
