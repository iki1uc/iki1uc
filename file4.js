// file4.js — Oberfläche / 4D

export function pfeiler_4(x) {
    return x !== undefined
}

export function anker_4(x) {
    return { value: x, time: performance.now(), dim: "4D" }
}

