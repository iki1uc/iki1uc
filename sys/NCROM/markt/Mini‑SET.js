AXIOMIAT = {
  origin: "iki1uc",     // µ0 Ursprung
  state: "fluid",       // µ0 Zustand
  cache: true,          // µ0 Gedächtnis
  ready: true,          // µ0 Bereitschaft

  // µ1–µ3 noch nicht aktiv
  active: false,
  passage: false,

  // µ9 deaktiviert
  pulse: 0,
  orbit: 0,
  drift: 0,

  // µ81 leer
  cluster: Array(81).fill(null)
}
