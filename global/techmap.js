export const TECHMAP = {
    map: {},

    // Technologie einem Anker zuordnen
    register(techName, anker){
        this.map[techName] = anker;
    },

    // Signal setzen
    signal(techName, state){
        const anker = this.map[techName];
        if(!anker){
            console.log("UNBEKANNT:", techName);
            return;
        }

        anker.leuchten(state);

        if(state){
            console.log("ÜBELTÄTER:", techName);
        }
    }
};

