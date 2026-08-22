// ------------------------------------------------------
// NC KERNEL · AXIS‑36E
// ------------------------------------------------------

const NC = {
    x: NC_PARAM.neutral.x,
    y: NC_PARAM.neutral.y,
    r: NC_PARAM.neutral.r,

    move(cmd){
        switch(cmd){
            case "N→": this.x += NC_PARAM.step; break;
            case "N←": this.x -= NC_PARAM.step; break;
            case "N↑": this.y -= NC_PARAM.step; break;
            case "N↓": this.y += NC_PARAM.step; break;

            case "NC↻": this.r += NC_PARAM.radiusStep; break;
            case "NC↺": this.r -= NC_PARAM.radiusStep; break;
            case "NC+": this.r += NC_PARAM.radiusBoost; break;
            case "NC-": this.r -= NC_PARAM.radiusBoost; break;
        }
    },

    neutral(){
        this.x = NC_PARAM.neutral.x;
        this.y = NC_PARAM.neutral.y;
        this.r = NC_PARAM.neutral.r;
    }
};

// ------------------------------------------------------
// KI‑Move – automatische Bewegung
// ------------------------------------------------------

function ncAI(){
    const cmds = ["N→","N←","N↑","N↓","NC↻","NC↺","NC+","NC-"];
    const cmd = cmds[Math.floor(Math.random()*cmds.length)];
    NC.move(cmd);
    ncRender("KI‑Move: " + cmd);
}

// ------------------------------------------------------
// UI‑Bindung
// ------------------------------------------------------

function ncMove(cmd){
    NC.move(cmd);
    ncRender("Move: " + cmd);
}

function ncNeutral(){
    NC.neutral();
    ncRender("Neutral");
}

function ncRender(msg){
    const out = document.getElementById("nc_out");
    out.textContent = NC_PARAM.sync(`
${msg}
x=${NC.x}
y=${NC.y}
r=${NC.r}
    `);
}
