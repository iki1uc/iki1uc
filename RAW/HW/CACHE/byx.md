export function EINGANG(markt, economy, industry, bewegung) {
    return markt.wert + economy.wert + industry.wert + bewegung.wert;
}

export function AUSGANG(markt, economy, industry, bewegung) {
    return markt.wert * economy.wert * industry.wert * bewegung.wert;
}

export function GOLDENER_SCHNITT_6(markt, economy, industry, bewegung) {
    const eingang = EINGANG(markt, economy, industry, bewegung);
    const ausgang = AUSGANG(markt, economy, industry, bewegung);

    return {
        eingang,
        ausgang,
        gs6: ausgang / eingang
    };
}

