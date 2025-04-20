import { Page, Frame } from '@playwright/test';
import { locators } from '../locators/locators';
import { TIMEOUT } from '../utils/timeoutConstants';

export class HomePage {
    constructor(private page: Page) { }

    async acceptAgePopupIfVisible() {
        const isVisible = await this.page.isVisible(locators.home.over18Button);
        if (isVisible) {
            await this.page.click(locators.home.over18Button);
            await this.page.waitForTimeout(TIMEOUT.SHORT);
        }
    }

    async acceptCookiesIfVisible() {
        const cookieButton = this.page.locator(locators.cookiesLocator.coockiesAccept).first();
        if (await cookieButton.isVisible()) {
            await cookieButton.click();
            await this.page.waitForTimeout(300);
        }
    }

    async performSearch(gameName: string) {
        const toggle = this.page.locator(locators.home.searchToggle);
        const input = this.page.locator(locators.home.searchInput);
        const submit = this.page.locator(locators.home.searchSubmit);

        await toggle.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
        await toggle.click();

        await input.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
        await input.fill(gameName);

        await submit.waitFor({ state: 'visible', timeout: TIMEOUT.MEDIUM });
        await submit.click();
    }

    async waitForGameCardAndLaunch(gameName: string) {
        const gameCard = this.page.locator(locators.home.gameCardByName(gameName));
        await gameCard.waitFor({ state: 'visible', timeout: TIMEOUT.LONG });
        await gameCard.locator(locators.home.tryDemoButtonInsideCard).click();
    }

    async searchAndLaunchGame(gameName: string) {
        await this.performSearch(gameName);
        await this.waitForGameCardAndLaunch(gameName);
        await this.waitForGameIframe();
        await this.tapToEnterGame();
    }

    async waitForGameIframe() {
        await this.page.waitForSelector(locators.home.gameIframe, {
            timeout: TIMEOUT.MEDIUM,
            state: 'visible'
        });
    }

    async waitForGameReady(): Promise<{ frame: Frame, centerX: number, centerY: number }> {
        const iframeHandle = await this.page.waitForSelector(locators.home.gameIframe, {
            timeout: TIMEOUT.LONG,
            state: 'visible'
        });

        const frame = await iframeHandle.contentFrame();
        if (!frame) throw new Error('Game iframe not available');

        const canvas = await frame.waitForSelector('canvas', {
            timeout: TIMEOUT.LONG,
            state: 'visible'
        });

        const box = await canvas.boundingBox();
        if (!box || box.width === 0 || box.height === 0) {
            throw new Error('Canvas not rendered properly');
        }

        try {
            await frame.waitForSelector('#overlay, .loading-screen', {
                state: 'detached',
                timeout: 3000
            });
        } catch (e) {
        }

        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;

        return { frame, centerX, centerY };
    }

    async tapToEnterGame() {
        const { centerX, centerY } = await this.waitForGameReady();

        console.log(`Tapping center of canvas at x: ${centerX}, y: ${centerY}`);

        await this.page.mouse.move(centerX, centerY);
        await this.page.mouse.down();
        await this.page.waitForTimeout(100);
        await this.page.mouse.up();

        await this.page.waitForTimeout(1500);
    }
}
