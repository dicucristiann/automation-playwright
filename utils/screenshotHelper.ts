import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function takeScreenshot(page: Page, stepName: string, testName: string) {
    const folder = path.join('screenshots', testName);
    fs.mkdirSync(folder, { recursive: true });
    const filePath = path.join(folder, `${stepName}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
};