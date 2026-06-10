# Sauce Demo Playwright Tests

Playwright end-to-end test suite for the Sauce Demo sample application (Swag Labs).

## What this repo contains
- Playwright tests in `tests/` (login, inventory, cart, checkout, e2e)
- Page objects in `pages/`
- Fixtures in `fixtures/`
- GitHub Actions workflow at `.github/workflows/playwright.yml`

## Requirements
- Node.js 18+ and npm
- Playwright (installed via npm)

## Setup
```bash
cd my-project
npm install
npx playwright install
```

## Run tests
- Run all tests (default projects):
```bash
npx playwright test
```
- Run a single spec:
```bash
npx playwright test tests/login.spec.ts
```
- Run a test headed in Chromium:
```bash
npx playwright test --project=chromium --headed
```

## Reports
After running tests an HTML report is available. To open the most recent report:
```bash
npx playwright show-report
```

## Notes for interviews
- The repo demonstrates Playwright page objects, fixtures, and CI.
- Share your repo URL and point interviewers to `README.md` and the Playwright report.

## License
Specify your preferred license.
