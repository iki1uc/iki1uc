function biosStationCheck() {
    return {
        NC: "OK",
        Phi: "OK",
        Phi2: "OK",
        PhiInfinity: "OK"
    };
}

function biosDiagnostics() {
    const out = document.getElementById("bios_out");
    const st = biosStationCheck();

    out.textContent =
`[DIAGNOSTIK]
NC: ${st.NC}
Phi: ${st.Phi}
Phi2: ${st.Phi2}
PhiInfinity: ${st.PhiInfinity}

Systemdiagnose: Keine Fehler gefunden.`;
}

