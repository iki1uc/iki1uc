// ------------------------------------------------------
// ARGUMENTERIA · 36E
// Argument-Generator + arg.sync-Technik
// ------------------------------------------------------

// Hauptfunktion
function runArgumenteria() {
    const input = document.getElementById("arg_input").value.trim();
    const out = document.getElementById("arg_output");

    if (!input) {
        out.textContent = "Bitte ein Thema eingeben.";
        return;
    }

    const argument = generateArgument(input);
    const synced = argSync(argument);

    out.textContent = synced;
}

// ------------------------------------------------------
// Argument-Erzeugung
// ------------------------------------------------------
function generateArgument(topic) {
    return `
Thema: ${topic}

1. Ausgangspunkt:
   Das Thema ist relevant, weil es direkte Auswirkungen auf aktuelle Entscheidungen hat.

2. Hauptargument:
   Eine klare Analyse zeigt, dass ${topic} eine zentrale Rolle spielt,
   da mehrere Faktoren gleichzeitig wirken.

3. Gegenargument:
   Manche behaupten, dass ${topic} überschätzt wird,
   jedoch zeigt die Datenlage ein anderes Bild.

4. Fazit:
   Insgesamt ist ${topic} ein entscheidender Punkt,
   der nicht ignoriert werden darf.
`;
}

// ------------------------------------------------------
// arg.sync – Argument-Synchronisation
// ------------------------------------------------------
// Ziel:
// - Argumente strukturieren
// - Wiederholungen entfernen
// - Klarheit erhöhen
// - Konsistenz prüfen
// - 36E-Standard anwenden

function argSync(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    const cleaned = [];
    let last = "";

    for (const line of lines) {
        if (line !== last) cleaned.push(line);
        last = line;
    }

    return cleaned.join("\n");
}
