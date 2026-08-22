export const RATE = (achse, wert, norm) => ({
    achse,
    wert,
    norm,
    delta: wert - norm,
    status:
        wert === norm ? "Norm" :
        wert > norm && wert < norm * 3 ? "Übernorm" :
        wert >= norm * 3 ? "Extrem" :
        "Unternorm"
});

export const RATE_GEO = (geo) => RATE("GEO‑Form", geo.length, 9);
export const RATE_PHYSIK = (kraft) => RATE("Physik‑Kraft", kraft, 81);
export const RATE_TMP = (tmp) => RATE("TMP‑Resultierende", tmp.length, 3);

export const RATE_CITY = (city) => {
    const sum =
        city.leitbahn.breite +
        city.leitbahn.hoehe +
        city.leitbahn.tiefe +
        city.leitbahn.trans;
    return RATE("City‑System", sum, 999);
};

export const RATE_SPRUNG = (sprung) => RATE("SPRUNG‑Übergang", sprung.value, 9);
export const RATE_WAVE = (wave) => RATE("WAVE‑Loop", wave.cycle(), 27);

export const RATE_HW = (hw) => {
    const load = hw.cpu + hw.gpu + hw.ram + hw.cache;
    return RATE("Hardware‑Last", load, 50);
};

export const RATE_ALL = (sys) => ({
    geo: RATE_GEO(sys.geo),
    physik: RATE_PHYSIK(sys.kraft),
    tmp: RATE_TMP(sys.tmp),
    city: RATE_CITY(sys.city),
    sprung: RATE_SPRUNG(sys.sprung),
    wave: RATE_WAVE(sys.wave),
    hardware: RATE_HW(sys.hardware)
});
