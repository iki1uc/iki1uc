class CUBIK_KERNEL {

    constructor(){
        this.gpu = window.GPU_MAP || {};
        this.tmp = window.TMP || {};
    }

    buildCubik(){
        const raw = window.NC9X9 || [];
        const out = [];

        for(let r=0; r<9; r++){
            const row = [];
            for(let c=0; c<9; c++){

                const base = raw[r][c];

                const gpuStage = this.gpu.STAGE[(r % 4) + 1];
                const tmpAxisX = this.tmp.a[r];
                const tmpAxisY = this.tmp.d[c];
                const tmpAxisZ = this.tmp.e[(r+c) % 9];

                row.push({
                    r, c,
                    base,
                    gpuStage,
                    cubik: {
                        x: tmpAxisX,
                        y: tmpAxisY,
                        z: tmpAxisZ,
                        fusion: tmpAxisX + tmpAxisY + tmpAxisZ
                    },
                    qi: AXES.qi(r,c),
                    iqq: AXES.iqq(r,c),
                    octa: AXES.octa(r,c),
                    orbit: GHOST.orbit(r,c),
                    lage: LAGE.pos(r,c),
                    core: XCORE.map(r,c),
                    in: XIN.map(r,c),
                    out: XOUT.map(r,c)
                });
            }
            out.push(row);
        }

        return out;
    }

    send(matrix){
        VECTOR?.receive9hoch9(matrix);
        ALL?.receive9hoch9(matrix);
        GPU?.receiveCubik(matrix);
        NC?.receiveCubik(matrix);
    }

    start(){
        const matrix = this.buildCubik();
        this.send(matrix);
        return matrix;
    }
}

window.CUBIK_KERNEL = new CUBIK_KERNEL();
