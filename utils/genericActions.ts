import { Page, expect, Frame } from '@playwright/test';
import { TIMEOUT } from './timeoutConstants';

export async function scrollToBottomInFrame(frame: Frame) {
  await frame.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export async function waitAndClick(
  context: Page | Frame,
  selector: string,
  timeout = TIMEOUT.MEDIUM
) {
  await context.waitForSelector(selector, { timeout });
  await context.click(selector);
}


export async function verifyVisible(page: Page, selector: string, timeout = TIMEOUT.MEDIUM) {
    const locator = page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeVisible();
}  