import { Frame, Page } from "@playwright/test";
import { locators } from "../locators/locators";
import { takeScreenshot } from "../utils/screenshotHelper";
import { waitAndClick } from "../utils/genericActions";
import { TIMEOUT } from "../utils/timeoutConstants";

export class SettingsPage {
    constructor(private page: Page, private testName: string) { }

    async openHamburgerMenu() {
        const iframeHandle = await this.page.waitForSelector(locators.iFrame.frame, {
            timeout: TIMEOUT.LONG,
            state: 'visible'
        });

        const frame = await iframeHandle.contentFrame();
        if (!frame) throw new Error('Iframe not found');

        const canvasHandle = await frame.waitForSelector('canvas', {
            timeout: TIMEOUT.LONG,
            state: 'visible'
        });

        const box = await canvasHandle.boundingBox();
        if (!box || box.width === 0 || box.height === 0) {
            throw new Error('Canvas bounding box not available');
        }
        // relative coordinates in canvas
        const relativeX = box.x + box.width * 0.06;
        const relativeY = box.y + box.height * 0.92;

        console.log(`Tapping hamburger menu at x: ${relativeX}, y: ${relativeY}`);

        await iframeHandle.click();

        const maxRetries = 3;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.log(`→ Attempt ${attempt} to tap hamburger menu`);

            await this.page.mouse.move(relativeX, relativeY);
            await this.page.mouse.down();
            await this.page.waitForTimeout(100);
            await this.page.mouse.up();

            try {
                await frame.waitForSelector(locators.settings.gameInfoButton, {
                    timeout: 3000,
                    state: 'visible'
                });
                console.log('Hamburger menu is open');
                return;
            } catch (e) {
                if (attempt === maxRetries) {
                    console.error('Hamburger menu failed to open');
                    throw e;
                }
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async verifyTranslationInFrame(frame: Frame, expectedText: string) {
        const isVisible = await frame.locator(locators.iFrame.frame).allTextContents();
        if (!isVisible) {
            throw new Error(`Missing translation: "${expectedText}"`);
        }
        console.log(` Translation OK: "${expectedText}"`);
    }


    async openGameInfo(expectedTranslations: Record<string, string>) {
        const iframeElement = await this.page.locator(locators.iFrame.frame).elementHandle();
        const frame = await iframeElement?.contentFrame();
        if (!frame) throw new Error('Iframe not found via locator');

        await waitAndClick(frame, locators.settings.gameInfoButton);
        await takeScreenshot(this.page, 'game_info_opened', this.testName);
        await this.verifyTranslationInFrame(frame, expectedTranslations.game_info,);
    }


    async closeMenuButton() {
        const iframeElement = await this.page.locator(locators.iFrame.frame).elementHandle();
        const frame = await iframeElement?.contentFrame();
        if (!frame) throw new Error('Iframe not found via locator');

        await waitAndClick(frame, locators.settings.closeButton);
        await takeScreenshot(this.page, 'game_info_closed', this.testName);
    }

    async openGameRules(expectedTranslations: Record<string, string>) {
        const iframeElement = await this.page.locator(locators.iFrame.frame).elementHandle();
        const frame = await iframeElement?.contentFrame();
        if (!frame) throw new Error('Iframe not found via locator');

        await waitAndClick(frame, locators.settings.gameRulesButton);
        await takeScreenshot(this.page, 'game_rules_opened', this.testName);
        await this.verifyTranslationInFrame(frame, expectedTranslations.game_rules);
    }

    async closeGameRules() {
        await waitAndClick(this.page, locators.settings.closeButton);
        await takeScreenshot(this.page, 'game_rules_closed', this.testName);
    }

    async scrollInSection(sectionName: string) {
        const iframeHandle = await this.page.locator(locators.iFrame.frame).elementHandle();
        const frame = await iframeHandle?.contentFrame();
        if (!frame) throw new Error('Iframe not found');

        const content = frame.locator(locators.sidebarContent).first();
        await content.waitFor({ state: 'visible', timeout: TIMEOUT.LONG });

        await frame.evaluate(() => {
            const el = document.querySelector('div[class*="rulesContent"]');
            if (el) el.scrollTo(0, el.scrollHeight);
        });

        await takeScreenshot(this.page, `${sectionName}_scrolled`, this.testName);
    }

    async closeGameModal() {
        const closeButton = this.page.locator(locators.closeGameButton);

        await closeButton.waitFor({ state: 'visible', timeout: TIMEOUT.SHORT });
        await closeButton.click();

    }

}