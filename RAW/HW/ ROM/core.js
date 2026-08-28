export function QUAD_CORE(msg = "") {
    return {
        quad: "core",
        view: "compute",
        input: String(msg),
        active: true,
        cube: 81,
        layer: 4
    };
}

