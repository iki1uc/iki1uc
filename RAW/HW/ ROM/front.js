export function QUAD_FRONT(msg = "") {
    return {
        quad: "front",
        view: "render",
        input: String(msg),
        active: true,
        cube: 81,
        layer: 1
    };
}
