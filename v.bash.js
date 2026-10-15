# 1. Aktuellen Stand sichern
git add .
git commit -m "backup before 2 new index"

# 2. V1 als neuen index.html nehmen (clean, schnell, für Besucher)
cp index-v1-root-final-performance.html index.html

# 3. V2 als alternative index-v2.html behalten (volle Power)
# (kommt gleich) -> index-v2-wunder-bio-pro.html

# 4. Alte Sachen nicht löschen sondern archivieren
mkdir -p archive legacy
git mv old.html archive/old-v1.html  # old.html anders platzieren wie gewünscht
# mind.html bleibt, aber nimm MIND MEGA als mind.html
cp mind-mega-alle-bruder.html mind.html

# 5. 404 neu aus MIND extrahieren oder bestehendes verbessern
