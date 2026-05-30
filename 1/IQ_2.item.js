// IQ_2.item.js
// Maxi‑Item: große Darstellung, mehr Verhalten

export const IQ_2_Item = {
    id: "IQ_2",
    label: "Maxi‑Cube",
    active: true,

    size: {
        w: 120,
        h: 120
    },

    init() {
        console.log("IQ_2 → Maxi‑Item geladen");
        this.attachEvents();
    },

    attachEvents() {
        document.addEventListener("click", () => {
            console.log("IQ_2 → Interaktion erkannt");
        });
    }
};
