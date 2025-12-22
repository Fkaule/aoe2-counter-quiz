# AOE2 Counter-Quiz

Ein kleines Web-Quiz zu Kontereinheiten in **Age of Empires II: Definitive Edition** mit deutschen Einheitenamen,
englischen Zusatznamen (DE/EN), Bildern und einer Unterscheidung in starke, mittlere und schwache Counter.

> Hinweis: Alle Einheitenbilder liegen lokal im Projekt (SVG-Platzhalter), damit es keine "Not Found"-Fehler gibt.

## Quellen (für die Übersicht)

- https://www.youtube.com/watch?v=ZSv2TR8h0sM
- https://www.youtube.com/watch?v=QYMr8OCdmsE
- https://www.youtube.com/watch?v=RVruAIzXSS8
- https://www.youtube.com/watch?v=RngyjXZfWHU
- https://aoecompanion.com/counters

## Lokal starten

```bash
python -m http.server 8000
```

Dann im Browser öffnen: `http://localhost:8000`

## Docker

```bash
docker build -t aoe2-counter-quiz .
docker run --rm -p 8080:80 aoe2-counter-quiz
```

Öffne anschließend `http://localhost:8080`.
