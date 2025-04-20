import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportDir = path.join('playwright-report', `run-${timestamp}`);

const isOpenBrowser = process.env.OPEN_BROWSER === 'true';
const browser = (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium';

const isReportEnabled = process.env.TEST_REPORT === 'true';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: !isOpenBrowser,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: browser,
      use: { browserName: browser },
    }
  ],
  reporter: isReportEnabled
    ? [['html', { outputFolder: reportDir, open: 'never' }]]
    : [['list']],
});
