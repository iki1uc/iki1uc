// ops/reorder.js
// REORDER_BUFFER: ACTIVE – Prefetch + Order Engine für AX↔XA

export const REORDER_BUFFER = {

    active: true,
    buffer: [],
    max: 16,          // Größe des Buffers
    prefetch: true,
    superscalar: true,

    // === 1. Paket in den Buffer legen ===
    push(packet) {
        if (!this.active) return packet;

        if (this.buffer.length >= this.max) {
            this.buffer.shift(); // Ältestes Paket entfernen
        }

        this.buffer.push({
            ...packet,
            t: Date.now()
        });

        return packet;
    },

    // === 2. Prefetch-Order bestimmen ===
    prefetchOrder() {
        if (!this.prefetch || this.buffer.length === 0) return null;

        // Sortierung nach Zeit + Stabilität
        return [...this.buffer].sort((a, b) => {
            const sa = a.stable ? 1 : 0;
            const sb = b.stable ? 1 : 0;
            return sb - sa || a.t - b.t;
        });
    },

    // === 3. Superscalar-Ausführung ===
    superscalarExec() {
        if (!this.superscalar) return null;

        const order = this.prefetchOrder();
        if (!order) return null;

        // Zwei parallele Lanes: AX und XA
        const laneAX = order.filter(p => p.mode === "AX").slice(0, 2);
        const laneXA = order.filter(p => p.mode === "XA").slice(0, 2);

        return {
            laneAX,
            laneXA,
            parallel: true
        };
    },

    // === 4. Finaler REORDER-Output ===
    run(packet) {
        this.push(packet);

        return {
            route: "REORDER_BUFFER",
            timestamp: Date.now(),
            input: packet,
            buffer: this.buffer,
            prefetch: this.prefetchOrder(),
            superscalar: this.superscalarExec()
        };
    }
};
