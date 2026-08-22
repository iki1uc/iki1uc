// 81er Spirale (9x9)
export function spiral81(step){
    const size = 9;
    const layer = Math.floor(step / size);
    const pos = step % size;

    return {
        x: Math.sin(step / 3) * (layer * 10),
        y: Math.cos(step / 3) * (layer * 10),
        z: layer * 5,
        stabil: layer
    };
}

// 9er Spirale (3x3)
export function spiral9(step){
    const size = 3;
    const layer = Math.floor(step / size);
    const pos = step % size;

    return {
        x: Math.sin(step) * (layer * 5),
        y: Math.cos(step) * (layer * 5),
        z: layer * 2,
        stabil: layer
    };
}

// 3er Spirale (1x3)
export function spiral3(step){
    return {
        x: Math.sin(step) * 3,
        y: Math.cos(step) * 3,
        z: step,
        stabil: step
    };
}

// 3x27 Achsen-Modell
export function axis3x27(step){
    const axis = step % 3;
    const pos = step % 27;

    return {
        x: axis === 0 ? pos : 0,
        y: axis === 1 ? pos : 0,
        z: axis === 2 ? pos : 0,
        stabil: pos / 27
    };
}

