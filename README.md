Formulärregistrering Test Suite
Ett omfattande testprojekt skrivet i Playwright för att validera ett registreringsformulärs funktionalitet, användarvänlighet och prestanda.

🚀 Översikt
Detta projekt innehåller automatiserade tester för ett webbaserat registreringsformulär. Testerna täcker allt från grundläggande funktionalitet till avancerad validering och prestandatester.

📋 Testade Funktionaliteter
Formulärfält
Namn: Validering av obligatoriskt fält, längdkrav och teckenbegränsningar

Födelseår: Åldersvalidering, giltiga år och format

E-post: Korrekt e-postformat och unikhetskontroll

Lösenord: Säkerhetskrav och styrkevalidering

Testtyper
✅ Funktionalitetstester

✅ Valideringstester

✅ Användarvänlighetstester

✅ Prestandatester

✅ Skalbarhetstester

🛠 Teknisk Stack
Testramverk: Playwright

Språk: TypeScript

Testkörning: Headless & Headed modus

Rapportering: HTML Reporter

CI-klar: Parallel test execution

📁 Projektstruktur
tests/e2e/ - End-to-end tester (nuvarande fokus)

tests/unit/ - Framtida unit tests

tests/integration/ - Framtida integrationstester

config/ - Centraliserad konfiguration

docs/ - Testdokumentation

reports/ - Manuella rapporter och analys

TEST_2
form-registration-tests/
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 🐙 playwright-tests.yml
│       ├── 🚀 deploy.yml
│       └── 🗃 database-test.yml
├── 📁 tests/
│   ├── 📁 e2e/
│   │   ├── 📁 pages/                 # Page Object Models
│   │   │   ├── 🏠 base-page.ts
│   │   │   ├── 📝 form-page.ts
│   │   │   ├── ⏰ timer-page.ts
│   │   │   └── 📒 notes-page.ts
│   │   ├── 📁 specs/                 # Testfall grupperade efter funktionalitet
│   │   │   ├── 🎯 form-registration.spec.ts
│   │   │   ├── ⚡ form-performance.spec.ts
│   │   │   ├── 🔍 diagnostic.spec.ts
│   │   │   ├── ♿ accessibility.spec.ts
│   │   │   ├── 🎨 themes.spec.ts
│   │   │   ├── ⏱️ timer.spec.ts
│   │   │   ├── 📝 notes.spec.ts
│   │   │   └── 🧩 widgets.spec.ts
│   │   └── 📁 utils/                 # Test utilities
│   │       ├── 🛠️ helpers.ts
│   │       ├── 📊 form-helpers.ts
│   │       ├── 📋 test-data.ts
│   │       └── 🎭 test-utils.ts
│   ├── 📁 unit/                      # Framtida unit tests
│   │   └── README.md
│   └── 📁 integration/               # Framtida integration tests
│       └── README.md
├── 📁 test-results/                  # Automatiskt genererade rapporter
│   ├── 📁 html-report/
│   ├── 📁 screenshots/
│   ├── 📁 videos/
│   └── 📁 traces/
├── 📁 config/                        # Konfigurationsfiler
│   ├── 🛠 playwright.config.ts
│   ├── 🔧 vite.config.ts
│   └── 📄 tsconfig.json
├── 📁 reports/                       # Manuellt genererade rapporter
│   └── 📊 test-summary.md
├── 📁 docs/                          # Dokumentation
│   ├── 📖 test-strategy.md
│   ├── 📋 test-cases.md
│   └── 🐛 bug-reports.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
├── 📄 .gitignore
├── 📄 .env.example                   # Miljövariabler mall
└── 📄 docker-compose.yml             # För eventuella tjänster


⚙️ Installation
Klona repositoriet

bash
git clone [repository-url]
cd form-registration-tests
Installera dependencies

bash
npm install
Installera Playwright browsers

bash
npx playwright install
🧪 Köra Tester
Grundläggande testkörning
bash
# Kör alla tester
npx playwright test

# Kör specifikt testfil
npx playwright test form-registration.spec.ts

# Kör tester med visning av browser (headed)
npx playwright test --headed
Avancerade kommandon
bash
# Kör tester med HTML rapport
npx playwright test --reporter=html

# Kör tester parallellt med 4 workers
npx playwright test --workers=4

# Kör tester mot specifik browser
npx playwright test --project=chromium

# Debug modus
npx playwright test --debug
Visa Testrapporter
bash
# Öppna senaste testrapport
npx playwright show-report

# Generera och visa rapport
npx playwright test --reporter=html && npx playwright show-report
📊 Testscenarier
1. Formulärladdning
Verifierar att alla fält och knappar laddas korrekt

Kontrollerar sidans titel och struktur

2. Fältvalidering
Namn: Tomt fält, för kort text, ogiltiga tecken

Födelseår: Ogiltigt år, för ung användare, icke-numeriskt

E-post: Ogiltigt format, saknad domain

Lösenord: För kort, endast siffror, endast bokstäver

3. Lyckad registrering
Komplett formulär med giltig data

Bekräftelse på framgångsrik registrering

4. Prestandatester
Sidladdningstid (< 3 sekunder)

Valideringsrespons (< 1 sekund)

🔧 Konfiguration

### Playwright Config (config/playwright.config.ts)

Konfigurationsfilen är placerad i `config/` mappen och innehåller:

- **Test directory**: `tests/e2e/specs/`
- **Base URL**: `https://tap-ht24-testverktyg.github.io/form-demo/`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome
- **Reporters**: HTML, JSON, JUnit, Line
- **Trace & Screenshots**: På vid första retry och vid failure

### Miljövariabler

För lokal utveckling kan du skapa en `.env` fil:

```env
BASE_URL=https://tap-ht24-testverktyg.github.io/form-demo/
CI=false
```

### Använda rätt config

För att använda config-filen i `config/` mappen:

```bash
npx playwright test --config=config/playwright.config.ts
```

Eller uppdatera `package.json` scripts för att använda den som standard.

📞 Support
Om du stöter på problem eller har frågor:

Kontrollera Playwright dokumentation

Granska testrapporter för detaljerade felmeddelanden

Öppna ett issue i repositoriet

📄 Licens
Distribueras under MIT-licens. Se LICENSE fil för detaljer.

Utvecklat med ❤️ för kvalitetssäkring och användarvänlighet
