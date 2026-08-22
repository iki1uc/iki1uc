// ops/engine.js
// ENGINE: AX_IN → ROUTER(AX↔XA) → XA_OUT
// REORDER + SUPERSCALAR aktiv

import { AX_IN } from "./ax_in.js";
import { AX_XA_ROUTER } from "./ax_xa_router.js";

export const ENGINE = {

    config: {
        AX_IN: true,
        XA_OUT: true,
        ROUTER: "AX↔XA",
        REORDER: true,
        SUPERSCALAR: true
    },

    // === 1. AX_IN Phase ===
    ax_in(sys, tem, AU, RA) {
        if (!this.config.AX_IN) return null;
        return AX_IN(sys, tem, AU, RA);
    },

    // === 2. ROUTER Phase (AX → XA → AX) ===
    router(ax) {
        if (!this.config.ROUTER) return ax;
        return AX_XA_ROUTER(ax);
    },

    // === 3. XA_OUT Phase ===
    xa_out(routerPacket) {
        if (!this.config.XA_OUT) return routerPacket;

        return {
            route: "XA_OUT",
            timestamp: Date.now(),
            id: routerPacket.AX_out.id,
            amplify: routerPacket.AX_out.amplify,
            stable: routerPacket.AX_out.stable,
            bildung: routerPacket.bildung
        };
    },

    // === 4. REORDER Phase ===
    reorder(packet) {
        if (!this.config.REORDER) return packet;

        return {
            ...packet,
            reorder: true,
            order: ["AX_IN", "ROUTER", "XA_OUT"]
        };
    },

    // === 5. SUPERSCALAR Phase ===
    superscalar(packet) {
        if (!this.config.SUPERSCALAR) return packet;

        return {
            ...packet,
            superscalar: true,
            lanes: 2,
            parallel: ["AX", "XA"]
        };
    },

    // === 6. ENGINE EXECUTION ===
    run(sys, tem, AU, RA) {

        const ax = this.ax_in(sys, tem, AU, RA);
        const routed = this.router(ax);
        const xa = this.xa_out(routed);
        const reordered = this.reorder(xa);
        const scalar = this.superscalar(reordered);

        return {
            route: "ENGINE",
            timestamp: Date.now(),
            AX_IN: ax,
            ROUTER: routed,
            XA_OUT: xa,
            FINAL: scalar
        };
    }
};
