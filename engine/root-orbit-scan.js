export function orbitScan(aixis, respo) {
    return {
        orbit: true,
        axis: aixis || null,
        mode: respo || "alpha",
        timestamp: Date.now()
    };
}

