// in4.js — 4D Input

export function in_4d(x, t = performance.now()) {
    const pfeiler = () => x !== undefined
    const anker = () => ({ value: x, time: t, dim: "4D" })

    if (!pfeiler()) throw new Error("in_4d: kein Input")
    return anker()
}

