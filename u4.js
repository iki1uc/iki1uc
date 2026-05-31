// u4.js — 4D Upgrade

export function up_4d(state, level = 1) {
    const pfeiler = () => state && state.value !== undefined
    const anker = () => ({
        value: state.value + level,
        time: performance.now(),
        dim: "4D+"
    })

    if (!pfeiler()) throw new Error("up_4d: state ungültig")
    return anker()
}

