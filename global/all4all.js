export const GLOBAL_ALL4ALL = {
    active: false,
    anker: [],        // alle 128 Anker
    watson: false,    // Watson-Signal

    init(alleAnker){
        this.anker = alleAnker;
    },

    on(){
        this.active = true;
        this.watson = true;

        console.log("GLOBAL ALL4ALL → AKTIV");
        console.log("WATSON → LEUCHTET");

        this.anker.forEach(a => a.leuchten(true));
    },

    off(){
        this.active = false;
        this.watson = false;

        console.log("GLOBAL ALL4ALL → AUS");
        console.log("WATSON → DUNKEL");

        this.anker.forEach(a => a.leuchten(false));
    }
};

