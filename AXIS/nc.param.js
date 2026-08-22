// ------------------------------------------------------
// NC PARAM · 36E
// Neue Parameter-Technik für alle NC-Module
// ------------------------------------------------------

const NC_PARAM = {
    version: "36E",
    modules: [
        "nc_u",
        "nc_in",
        "nc_me",
        "nc_run",
        "nc_ces",
        "nc_sec"
    ],

    // Parameter für NC-Bewegung / NC-Logik
    settings: {
        step: 10,
        radiusStep: 2,
        radiusBoost: 5,
        neutralX: 0,
        neutralY: 0,
        neutralR: 20
    },

    // Sync-System (wie arg.sync)
    sync(text) {
        const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
        const out = [];
        let last = "";

        for (const l of lines) {
            if (l !== last) out.push(l);
            last = l;
        }
        return out.join("\n");
    },

    // Prüfen ob ein NC-Modul existiert
    exists(name) {
        return this.modules.includes(name);
    }
};
