RAM.md — BLATT :: Read And Move :: Biotel Live-Ring
RAM darf sterben. Muss sogar. Sonst wird es zu schlechtem ROM.
DO IT YOUR MOVE — jeder ist King.

1. Was ist RAM
RAM = jetzt. Flüchtig. Lebendig. Stirbt wenn Strom weg.
RAM ist nicht Speicher, RAM ist Bewegung.

RAM = void.tmp.js → id.tmp.js → move.tmp.js → leben.js → stirbt → wieder void
2. RAM Files — diese dürfen täglich sterben
PLAYER KETTE (DO IT YOUR MOVE):
- player.js          = 1te — du, erste Instanz, King
- uno.js             = 2te — 108 Karten (76 Zahl + 24 Aktion + 8 Wild)
- figur.js           = Figur — ♔♕♖♗♘♙ auf Brett
- schachbrett.js     = 8x8=64 — Feld
- soccer.js          = Ball rollt — vx + wind
- wetter.js          = Wind — beeinflusst schach + soccer
- katapult.js        = Katapult — wirft Figur
- kopf.los.js        = Kopf los — Joker, darf alles
- greifbar.js/html   = Greifbar — was du jetzt greifen kannst
- leben.js/html      = Leben 88→99→0 — darf auf 0 gehen!
- bio.js/html        = Bio — Körper temporär
- lvl.html           = Level — temporär
- my.story,html      = Story — deine, temporär
- kahraman.html      = Held (tr) — temporär
- newton.html        = Physik — temporär, fällt
- nirwana.html       = Nirvana — temporär, kommt und geht
- notfall.html       = Notfall — nur wenn nötig
- search.html        = Suche — temporär
- watson.html        = Watson — fragt, vergisst
TMP (immer RAM, nie ROM):
- 0/void.tmp.js
- 3/id.tmp.js
- 9/move.tmp.js
- id.tmp.js, move.tmp.js, void.tmp.js, 81.tmp, Live.tmp, REAL.tmp
CTRL selbst ist auch RAM (entscheidet, aber stirbt):
- Cache.ctrl.js, rom.ctrl.js, role.ctrl.js, cpu.js, gpu.js.html
- cpu.html, Cache.html, index.html → leben.html
- ctrl.index.html — der King der RAMs
3. DO IT YOUR MOVE — Jeder ist King (Joker King)
Schach hat Regeln. RAM hat keine.

KING MOVE: 1 Feld in jede Richtung — langsam, aber darf überall hin
JOKER KING: darf wie Dame + Springer + Katapult — lol man
JEIWERKER KING: jeder Worker ist King in seinem Feld
Regel für RAM:

Jeder darf ziehen, nicht nur einer
Kein Zug ist illegal, nur manche werden nicht nach ROM übernommen
Joker (kopf.los.js) darf alles: Dame, Springer, Katapult in einem
Wenn du nicht ziehst, ziehst du trotzdem — Wetter zieht für dich
DO IT: mach deinen Move
YOUR: dein Move, nicht meiner
MOVE: Bewegung zählt, nicht Ziel
SO SOLL ES WIRKEN: so soll es wirken — Wirkung > Absicht
JEIWERKER KING: jeder Worker ist King auf seinem Feld
4. Wie RAM stirbt (soll es)
ATEM 16s:
ein 4s   = RAM sammelt — einatmen, greifen
halten 4s = CTRL prüft — ist Move gut?
aus 4s   = RAM gibt ab — ausatmen, loslassen
halten 4s = void BLATT — PAUSE 0B — RAM tot, Platz für Neues
Leben:
leben.js = 88 → 99 → 0 → 88 → ...
Nicht 88→99 festhalten! 99→0 ist Teil des Moves. Sterben ist Move.
5. RAM → ROM Transfer — nur das Beste überlebt
Nicht jeder Move wird ROM. Nur wenn:

- 81x funktioniert
- 3 verschiedene Worker (B-H-T) haben ihn gemacht
- Wetter + Soccer haben zugestimmt (wind + ball roll)
- Kein Notfall (notfall.html nicht aktiv)
Dann:

RAM Move → Cache.ctrl.js prüft → rom.ctrl.js segnet → schreibt nach hdf.rom → wird WONDERIUS
Alles andere: stirbt. Darf sterben. Soll sterben.

6. Joker King Moves — lol man
♔ KING:      1 Feld — B: PLAYER/FIGUR/SCHACH
♕ JOKER DAME: gerade + diagonal + kreuz — H: SOCCER/WETTER/UNO
♘ JOKER SPRINGER: springt — T: ROLE/ETHER/VOID
♜ KATAPULT:  wirft über 3 Felder — KAH:MAN
♚ JEIWERKER KING: alle Moves gleichzeitig — darf alles, aber nur 1x pro Atemzyklus (16s)
LOL MAN Regel: Wenn du lachst beim Zug, ist Zug gültig. Ernst ist für ROM, lol ist für RAM.
7. Verhältnis zu ROM
ROM: ether.js, void.js, atom.js, 729, 81, hdf.rom — 1x zentral, unsterblich
RAM: alles andere — Nx, sterblich, greifbar
CTRL: entscheidet — Cache.ctrl, rom.ctrl, ctrl.index.html
Ziel Verhältnis: 1 ROM : 3 RAM — aktuell 5:40 = zu viel RAM, deshalb startet index nicht
Fix: Mehr ROM-Halter, weniger RAM-Läufer gleichzeitig live
8. Für ctrl.index.html
- Jeder File ist greifbar: drag → B-H-T tauschen
- Jeder File hat King-Move-Button: DO IT YOUR MOVE
- Joker King Button: darf alles, aber nur wenn du lol sagst
- Global: INDEX → LEBEN = alle RAMs auf einmal live, aber gestaffelt nach ATEM 16s
- Speed 0.1x→10x: wie schnell RAM stirbt und neu kommt
RAM.md — Stand: DO IT YOUR MOVE — jeder ist King, Joker darf alles, lol man
RAM darf sterben. Muss sogar. Sonst wird es zu schlechtem ROM.
