// CONNECT.js — Motor für LINK → NET → TMP‑ROOT

export function CONNECT(linkHoehe, netBreite) {

    // 1. INPUT
    const LINK = linkHoehe;      // Höhe
    const NET  = netBreite;      // Breite
    const OP   = 1;              // CONNECT.OPERATOR (Grundwert)

    // 2. PROCESS — deine Wurzel‑Zieherei
    const WURZEL = Math.sqrt(LINK * NET);
    const Vektor = (LINK + NET) / OP;
    const NeunterPunkt = WURZEL * Vektor;

    // TMP‑ROOT Stabilisierung
    const TMP_ROOT = Number(NeunterPunkt.toFixed(3));

    // 3. OUTPUT — Pipeline‑Aktivierung
    return {
        TMP_ROOT,            // Tiefe
        Pipeline_START: true,
        RESPO_SIGNAL: TMP_ROOT > 0,
        AEON_FOKUS: TMP_ROOT,
        MOVE_OK: TMP_ROOT !== 0,
        READY_ACTIVE: true
    };
}
