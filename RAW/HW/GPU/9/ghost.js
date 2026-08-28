const orbit = {
    speed: Phi * 2,
    radius: phi * 3,
    evo: phi2 * phiinfty
};
const operatoren = {
    bewegung: Phi + phi,
    stabilitaet: phi2 - phi,
    raster: Phi * phi2
};
const status = (Phi + phi + phi2 + phiinfty) > 2 ? "aktiv" : "ruhig";
const erinnerung = {
    lastPhi: Phi,
    lastPhi2: phi2,
    lastOrbit: orbit.evo
};
const ghost = ghost5E(Phi, phi, phi2, phiinfty);
updateTmp(lage.mini, axes, axes.bewegung, ghost.orbit);
GPU_MATRIX_692_TENSOR.update(
    lage.mini,
    lage.maxi,
    { mini: lage.mini.stabil, maxi: lage.maxi.stabil },
    692,
    respo.final,
    ghost.orbit
);
Cubik4D.update(
    lage.mini,
    axes,
    axes.bewegung,
    ghost.orbit,
    respo.final,
    GPU_MATRIX_692_TENSOR
);
