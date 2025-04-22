import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SettingsPage } from '../pages/settingsPage';
import { takeScreenshot } from '../utils/screenshotHelper';
import { config } from '../utils/envHelper';

import en from '../translation/en.json';
// import fr from '../translation/fr.json';
// import de from '../translation/de.json';

const translationsMap: Record<string, any> = {
  en,
  // fr,
  // de,
};

const language = config.LANGUAGE.toLowerCase();

const expectedTranslations = translationsMap[language];
if (!expectedTranslations) {
  throw new Error(`No translations defined for language: ${language}`);
}

test.describe(`Translation test - ${language}`, () => {
  test(`Validate translations in game - ${language}`, async ({ page }, testInfo) => {
    const testName = `${language}_${testInfo.title.replace(/\s+/g, '_')}`;
    const baseUrl = `${config.BASE_URL}?lang=${language}`;

    await page.goto(baseUrl);
    await takeScreenshot(page, 'homepage_loaded', testName);

    const homePage = new HomePage(page);
    const settings = new SettingsPage(page, testName);

    await homePage.acceptCookiesIfVisible();
    await homePage.acceptAgePopupIfVisible();
    await homePage.searchAndLaunchGame('7 lucky gods');

    await settings.openHamburgerMenu();
    await settings.openGameInfo(expectedTranslations);
    await settings.scrollInSection('game_info');
    await settings.closeMenuButton();

    await settings.openHamburgerMenu();
    await settings.openGameRules(expectedTranslations);
    await settings.scrollInSection('game_rules');
    await settings.closeMenuButton();

    await settings.closeGameModal();
  });
});
