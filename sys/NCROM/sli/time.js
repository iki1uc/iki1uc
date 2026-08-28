function STAND(markt, commander) {
    return {
        preis: markt.preis,
        volumen: markt.volumen,
        impuls: markt.impuls,
        wert: markt.wert,
        impact: commander.impact,
        stand: markt.wert * commander.impact
    };
}
