# Riešenie

## 1. Webová aplikácia (Next.js + Spring Boot + SQLite)

Aplikácia pozostáva zo štyroch stránok:
- `/` — admin stránka pre správu UI stavov jednotlivých podstránok
- `/page-one`, `/page-two`, `/page-three` — podstránky s tlačidlami, tabuľkou a textovými poliami

Frontend bol implementovaný v Next.js 14 (App Router) s Tailwind CSS.
Backend bol implementovaný v Java 21 + Spring Boot 3 s SQLite databázou cez Spring Data JPA.

## 2. Systém globálneho ovládania UI

Každá podstránka má vlastný záznam v tabuľke `GlobalControl` v databáze.
Admin stránka načíta stav všetkých troch podstránok naraz a umožňuje nezávisle meniť:
- dostupnosť tlačidiel (`isButtonDisabled`)
- editovateľnosť textových polí (`isInputDisabled`)
- viditeľnosť tabuľky (`isTableVisible`)

Zmeny sa okamžite ukladajú do databázy cez PATCH `/api/control`.

## 3. Práca s .md súbormi a AI agentom

Celý projekt bol riadený pomocou spec-driven development — pred písaním kódu boli vytvorené špecifikačné súbory:

- `CLAUDE.md` — prehľad projektu a pravidlá pre AI agenta
- `specs/architecture.md` — architektúra a stack
- `specs/shared/data-models.md` — zdieľané dátové modely
- `specs/shared/api-contracts.md` — API kontrakty medzi FE a BE
- `specs/shared/error-codes.md` — HTTP chybové kódy
- `specs/database/spec.md` — schéma databázy
- `specs/backend/spec.md` — pravidlá pre backend
- `specs/frontend/spec.md` — pravidlá pre frontend
- `specs/code-review.md` — príručka pre ľudských reviewerov

AI agent (opencode) čítal tieto súbory a implementoval projekt v poradí DB → BE → FE podľa definovaného plánu.

## 4. ERROR detekcia

Každé textové pole na podstránkach sleduje svoju hodnotu.
Keď používateľ napíše presne `ERROR` (veľkými písmenami), všetky tlačidlá na tej istej podstránke sčervenajú a na backend sa odošle log, ktorý sa uloží do tabuľky `ErrorLog` v databáze.
Po zmene hodnoty poľa sa tlačidlá vrátia do normálneho stavu.

## 5. Bonus — lokálny AI model

Bol stiahnutý model **Gemma 3 4B** z Hugging Face cez Ollama (`ollama pull gemma3:4b`).
Model beží lokálne na CPU (16GB RAM). Integrácia do opencode cez Ollama provider je pripravená.
Porovnanie výkonu s cloudovými modelmi nebolo dokončené.