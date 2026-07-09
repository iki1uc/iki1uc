function runArgumenteria() {
    const input = document.getElementById("arg_input").value.trim();
    const out = document.getElementById("arg_output");

    if (!input) {
        out.textContent = "Bitte ein Thema eingeben.";
        return;
    }

    const argument = generateArgument(input);
    out.textContent = argument;
}

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

