// ============================================================
// TEST · NARRATIV-MASCHINE mit allen Kandidaten
// ============================================================

import { NarrativMaschine } from './core/243-iki1uc-verbindung.js';

// Alle Kandidaten (die 9 Buchstaben + mehr)
const kandidaten = [
  'a', 'b', 'c', 'y', 'x', 'z', 'q', 'd', 'f',
  'OS', 'BOOT', 'iki1uc', '243',
  'DOOR', 'DOO', 'RESPO', 'NC.engine',
  'SCORE', 'WETTE', 'SLIDE', 'AXIOM'
];

// Maschine erstellen
const maschine = new NarrativMaschine();

// Kandidaten hinzufügen
maschine.addKandidaten(kandidaten);

// Alle verarbeiten → Narrativ erzeugen
const narrativ = maschine.verarbeiteAlle();

// Text-Narrativ anzeigen
console.log(maschine.textNarrativ());

// Detailansicht
console.log("\n📊 Detail:", JSON.stringify(narrativ, null, 2));

// Im Browser ausgeben
if (typeof document !== 'undefined') {
  const pre = document.createElement('pre');
  pre.textContent = maschine.textNarrativ();
  pre.style.color = '#0ff';
  pre.style.background = '#0a0a12';
  pre.style.padding = '20px';
  pre.style.borderRadius = '10px';
  document.body.appendChild(pre);
}
