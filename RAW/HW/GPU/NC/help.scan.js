// RAW/HW/NC/help.scan.js

export function helpScan(run3, directVState, ghost) {

    return {
        orbit: {
            speed: run3.orbital.speed,
            radius: run3.orbital.radius,
            evo: run3.orbital.evo,
            status: ghost.status
        },

        operatoren: {
            bewegung: run3.operator.bewegung,
            stabilitaet: run3.operator.stabilitaet,
            raster: run3.operator.raster
        },

        movementFusion: {
            x: run3.fusion.x,
            y: run3.fusion.y,
            z: run3.fusion.z,
            stabil: run3.fusion.stabil,
            quant: run3.fusion.quant
        },

        directV: {
            speed: directVState.speed,
            stabil: directVState.stabil,
            quant: directVState.quant,
            boost: directVState.boost
        },

        erinnerung: ghost.erinnerung,

        summary: `Orbit ${ghost.status}, Speed ${run3.orbital.speed}, Boost ${directVState.boost}`
    };
}
