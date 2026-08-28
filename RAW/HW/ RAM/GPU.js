// gpu.js — zentrale Datenquelle für ALLE GPU-Seiten

export async function fromGPU(input) {
    const msg = (input && input.msg) ? String(input.msg) : "";

    return {
        ok: true,
        gpu: "active",
        input: msg,
        len: msg.length,
        time: Date.now()
    };
}
