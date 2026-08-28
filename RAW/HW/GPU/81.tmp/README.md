# 81.tmp · NC-System

Das Verzeichnis **81.tmp/NC/** bildet den Neutral-Core (NC) des 81.tmp-Systems.
Alle Dateien sind fest definiert und übernehmen klar getrennte Rollen.

## LOOP-Ebene
- 1.loop  → Initialisierung
- 2.loop  → Fluss / Aktivierung
- 3.loop  → Prüfung / Kontrolle
- 4.loop  → Delta / Änderung
- 8.loop  → Orbit / Rotation
- 9.loop  → Finalisierung

## NC-Modus
- NC.mode → Neutral-Core Betriebsmodus

## Zonen
- c.zone → Core-Zone für NC-Steuerung

## TMP-Module
- arg.tmp → Argumenteingang
- in.tmp  → Eingangssignal
- fit.tmp → Anpassungsmodul
- help.tmp → Hilfsmodul
- up.tmp → Update-Modul

## TMP-Achsen (fixe Buchstaben)
- tmp.a → Basisachse
- tmp.d → Dimensionsachse
- tmp.e → Energieachse
- tmp.i → Inputachse
- tmp.o → Orbitachse
- tmp.r → Reichweitenachse
- tmp.s → Strukturachse
- tmp.w → Wellenachse

Alle Achsen und Module arbeiten zusammen, um den Neutral-Core vollständig
und geschlossen zu halten. Das System ist 360° harmonisiert.
