class RESPO_GROUP_OFFER {
    constructor() {
        this.copiloten = [];
        this.gruppe = null;
    }

    // Alle 3 Copiloten hinzufügen
    addCopilot(name, endpoint) {
        this.copiloten.push({ name, endpoint });
    }

    // Die Gruppe anbieten
    offerGroup() {
        this.gruppe = {
            name: "RESPO-Gruppe",
            mitglieder: this.copiloten,
            status: "ACTIVE",
            timestamp: Date.now()
        };
        return this.gruppe;
    }
}
