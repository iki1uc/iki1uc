# CONTINUUM.geo.md
# ZEIT · DISTANZ · NÄHE · ENTFERNUNG · ORBIT · RADAR · GEO-PHYSIK

CONTINUUM:
  SELF: C∞
  USE: TMP:C∞.712
  GEO: C∞

  ZEIT: CLOCK.∞
  SEQUENZ: ACTIVE
  DYNAMIK: TRUE

  NÄHE:
    - zeitlich: Δt < 1
    - räumlich: Δx < 1
    - orbit: Δorb < 0.1
    - radar: Δrad < 0.01

  ENTFERNUNG:
    - zeitlich: Δt > 1
    - räumlich: Δx > 1
    - orbit: Δorb > 0.1
    - radar: Δrad > 0.01

  RADAR: C∞R
  SAT: C∞S
  GEOPHYSIK: C∞G

  U1: CLOCK
  U2: SEQUENZ
  U3: DYNAMIK
  U4: RADAR
  U5: SAT
  U6: GEOPHYSIK
  U7: 3↺
  U8: COORD0
