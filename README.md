Formulärregistrering Test Suite
Automatiserade Playwright/TypeScript‑tester som validerar ett registreringsformulärs funktionalitet, tillgänglighet och prestanda.

🚀 Översikt
Testerna täcker formulärfält, valideringar, tillgänglighet, performance samt enklare widgetinteraktioner. Projektet körs mot `https://tap-ht24-testverktyg.github.io/form-demo/` och är förberett för körning i CI.

🛠 Teknisk Stack
- Testramverk: Playwright
- Språk: TypeScript
- Reporter: HTML, JSON, JUnit
- Körning: Headless/Headed, multi‑browser

📁 Struktur
```
TEST_2/
├── .github/workflows/
│   ├── playwright-tests.yml
│   ├── deploy.yml
│   └── database-test.yml
├── config/
│   ├── playwright.config.ts
│   └── tsconfig.json
├── docs/
│   ├── test-strategy.md
│   ├── test-cases.md
│   └── bug-reports.md
├── reports/
│   └── test-summary.md
├── tests/
│   ├── e2e/
│   │   ├── pages/
│   │   │   ├── base-page.ts
│   │   │   ├── form-page.ts
│   │   │   ├── timer-page.ts
│   │   │   └── notes-page.ts
│   │   ├── specs/
│   │   │   ├── form-registration.spec.ts
│   │   │   ├── form-performance.spec.ts
│   │   │   ├── diagnostic.spec.ts
│   │   │   ├── accessibility.spec.ts
│   │   │   ├── themes.spec.ts
│   │   │   ├── timer.spec.ts
│   │   │   ├── notes.spec.ts
│   │   │   └── widgets.spec.ts
│   │   └── utils/
│   │       ├── helpers.ts
│   │       ├── form-helpers.ts
│   │       ├── test-data.ts
│   │       └── test-utils.ts
│   ├── units/
│   │   └── README.md
│   └── integration/
│       └── README.md
├── package.json
├── package-lock.json
├── eslint.config.cjs
├── README.md
├── .gitignore
├── .env.example
└── docker-compose.yml
```

⚙️ Installation
```
npm install
npx playwright install
```

🧪 Körning
- `npm run test` – kör alla tester med central config
- `npm run test:e2e` – kör e2e‑specar
- `npm run test:form` – kör formulärspecar
- `npm run test:ui` – headed läge
- `npm run test:debug` – debug‑läge

📊 Rapporter
- `npm run test:ci` – genererar HTML/line rapporter
- `npm run test:report` – öppnar HTML‑rapporten i `test-results/html-report`

🧹 Kodkvalitet
- `npm run lint`
- `npm run lint:fix`
- ESLint v9 flat config: `eslint.config.cjs`

🔧 Konfiguration
- Base URL och reporter styrs via `config/playwright.config.ts`
- TypeScript‑paths och typer styrs via `config/tsconfig.json`

🌐 Miljövariabler
Skapa en `.env` (valfritt) baserad på `.env.example`:
```
BASE_URL=https://tap-ht24-testverktyg.github.io/form-demo/
CI=false
```

📚 Testscenarier
- Formulärladdning: element och knapp synliga
- Validering: namn, födelseår, e‑post, lösenord
- Lyckad registrering: giltig data och submission
- Performance: sidladdning < 3s, valideringsrespons < 1s
- Tillgänglighet: semantiska roller och interaktion
- Widgets: enkel interaktion med fält/knapp

🤖 CI
GitHub Actions workflow kör unit/e2e/performance, installerar Playwright‑drivare och publicerar rapporter.

Licens
MIT
