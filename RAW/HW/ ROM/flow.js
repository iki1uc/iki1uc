export function QUAD_FLOW(msg = "") {
    return {
        quad: "flow",
        view: "motion",
        input: String(msg),
        active: true,
        cube: 81,
        layer: 2
    };
}

