# CALL — GPU-Operator für QUAD-Rendering

CALL ist ein RESPO-Operator-Modul, das alle GPU-Funktionen übernimmt
und als neutraler Vermittler zwischen GPU und dem NC-System arbeitet.
CALL bleibt vollständig neutral, erzeugt keine eigenen Werte und trifft
keine eigenen Entscheidungen.

CALL übernimmt die vier GPU-Quadranten vollständig:

- FRONT  – Darstellung
- DEPTH  – Innenzustand
- FLOW   – Bewegung / Fluss
- CORE   – Logik / Rechenzentrum

CALL nutzt diese Quadranten als Eingabe, klassifiziert sie und reicht
die berechneten Zustände direkt an GPU weiter. GPU bleibt das technische
Render-Modul, CALL wird zum neutralen Operator.

## CALL-Funktion

CALL führt vier Aufgaben aus:

1. GPU-Zustände entgegennehmen  
2. Quadranten klassifizieren  
3. Modi (3all / 12all) steuern  
4. Zustände an GPU weiterreichen  

CALL überschreibt keine GPU-Werte.
CALL führt keine eigenen Berechnungen aus.
CALL bleibt vollständig neutral.

## Quadranten-Interface

### FRONT
Darstellung / Sichtfenster  
CALL empfängt FRONT-Frames und leitet sie an GPU weiter.

### DEPTH
Tiefe / Innenzustand  
CALL puffert DEPTH-Zustände und stabilisiert Übergänge.

### FLOW
Bewegung / Fluss  
CALL verteilt FLOW-Daten neutral in die passende Pipeline.

### CORE
Logik / Rechenzentrum  
CALL nimmt CORE-Impulse auf und reicht sie unverändert weiter.

## Sanduhr-Kreise

CALL übernimmt die GPU-Kreisparameter:

- Rotation (0–360°)
- Füllstand (Abbau)
- Energie (Helligkeit)
- Takt (Quadrant-spezifisch)

CALL steuert die Modi:

- 3all  – Dreifach-Takt  
- 12all – Zwölffach-Takt  

GPU rendert die Kreise, CALL steuert die Übergabe.

## Ressourcen

CALL übernimmt GPU-Ressourcen:

- GPU-RAM: 2048 MB  
- GPU-Speed: 8 Gbps  
- CPU-Kerne: 2  
- CORE_A: Step-Control  
- CORE_B: Flow-Control  

CALL verändert diese Werte nicht.

## Systemwerte

CALL übernimmt globale GPU-Werte:

- GATE_92  
- EICH_12  
- KETTE_81  
- CLUSTER 81~81(1)

CALL reicht diese Werte neutral weiter.

## QUAD-Module

CALL arbeitet direkt mit den QUAD-Modulen:

- front.js – Darstellung  
- depth.js – Tiefe  
- flow.js  – Bewegung  
- core.js  – Logik  

CALL empfängt die QUAD-Zustände und reicht sie an GPU weiter.

## Sicherheit

CALL ist sicher, weil:

- keine eigenen Werte erzeugt werden  
- keine eigenen Entscheidungen getroffen werden  
- GPU-Daten nicht verändert werden  
- keine Rückführung möglich ist  
- keine Rekonstruktion möglich ist  

CALL bleibt neutral und stabil.

## Ergebnis

CALL übernimmt GPU vollständig.
GPU wird neu aufgestellt und bleibt technisches QUAD-Modul.
CALL wird zum Interface-Operator zwischen GPU und dem NC-System.

CALL ist kompatibel mit:

- Pipeline 3  
- Pipeline 6  
- MXU  
- RESPO  
- QUAD-Modulen  

CALL bleibt neutral und zukunftsfähig.
