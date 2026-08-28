export function QUAD_DEPTH(msg = "") {
    return {
        quad: "depth",
        view: "state",
        input: String(msg),
        active: true,
        cube: 81,
        layer: 3
    };
}

