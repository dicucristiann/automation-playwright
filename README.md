---
# AvatarUX Automation Framework

A lightweight, modular, and scalable end-to-end testing framework for AvatarUX's public website and games — powered by [Playwright](https://playwright.dev/), [TypeScript](https://www.typescriptlang.org/), and [Yarn](https://yarnpkg.com/).

---

## Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js**: `v22.11.0` (strictly required)
- **Yarn**: latest version

### How to install correct Node.js version (Windows)

Use [nvm-windows](https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.exe):

```bash
nvm install 22.11.0
nvm use 22.11.0
node -v   # should print 22.11.0
```

### Install Yarn (globally)

```bash
npm install -g yarn
```

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/dicucristiann/automation-ux.git
cd automation-ux
```

### 2. Install dependencies

```bash
yarn install
```

> This will install all Playwright packages, TypeScript, ts-node, dotenv, and related test tools.

### 3. Install Playwright Browsers

```bash
npx playwright install
```
---

## Folder Structure

```
automation-ux/
├── locators/         # All UI selectors
├── pages/            # Page Object Model classes
├── tests/            # Test specifications
├── utils/            # Helpers (env, screenshots, wait)
├── screenshots/      # Language-specific screenshots
├── test-results/     # Video, screenshots, reports
├── .env              # Test run configuration
├── README.md         # Project instructions
├── testRunner.ts     # Entry point for yarn test
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Configuration via `.env`

Edit `.env` to control which test to run, platform, and more:

```dotenv
BASE_URL=https://www.avatarux.com
LANGUAGE=french
PLATFORM=web
BROWSER=chromium
SUITE=sanity

COMPONENTS=
TEST=gameTranslation.spec.ts

OPEN_BROWSER=true
TEST_REPORT=false
```

---

## Running Tests

### Run test from `.env`

```bash
yarn test
```

> Executes the test configured under `TEST=` in `.env`.

### Debug interactively

```bash
npx playwright test tests/gameTranslation.spec.ts --debug
```

> Opens the Playwright Inspector UI.

---

## Features

- Built with **TypeScript**
- Screenshot capturing per language and test stage
- Supports **multi-language UI validation**
- Works with **headless** or **UI browsers**
- Modular structure following **Page Object Model**
- HTML report support

---

## Scripts (from `package.json`)

| Script         | Description                             |
|----------------|-----------------------------------------|
| `yarn test`    | Run test specified in `.env`            |
| `yarn test:debug` | Debug test with inspector enabled     |

---

## Example Test

```ts
await settings.openHamburgerMenu();
await settings.openGameInfo();
await settings.scrollInSection('game_info');
await settings.closeMenuButton();

await settings.openHamburgerMenu();
await settings.openGameRules();
await settings.scrollInSection('game_rules');
await settings.closeMenuButton();

await settings.closeGameModal();
```

---

## Troubleshooting

- If browsers are not installed, run `npx playwright install`
- Use `node -v` to confirm you're running Node `v22.11.0`
- Clear `.env` overrides if tests aren’t behaving as expected
- To re-install everything: `rm -rf node_modules yarn.lock && yarn install`

---

## License

MIT — maintained by [@dicucristiann](https://www.linkedin.com/in/cristian-s-dicu/)
