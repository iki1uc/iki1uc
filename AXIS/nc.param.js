// ------------------------------------------------------
// NC PARAM · AXIS‑36E
// ------------------------------------------------------

const NC_PARAM = {
    step: 10,
    radiusStep: 2,
    radiusBoost: 5,

    neutral: { x:0, y:0, r:20 },

    sync(text){
        const lines = text.split("\n").map(l=>l.trim()).filter(l=>l.length>0);
        const out = [];
        let last = "";
        for(const l of lines){
            if(l !== last) out.push(l);
            last = l;
        }
        return out.join("\n");
    }
};
