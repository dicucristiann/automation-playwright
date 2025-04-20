import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const COMPONENTS = process.env.COMPONENTS || 'all';
const TEST = process.env.TEST || '';
const TEST_DIR = 'tests';

let runTarget = '';

if (COMPONENTS !== 'all') {
    runTarget = path.join(TEST_DIR, COMPONENTS);
} else if (TEST) {
    runTarget = `${TEST_DIR}/${TEST}`;
} else {
    runTarget = TEST_DIR;
}

console.log(`Running Playwright tests in: ${runTarget}`);
execSync(`npx playwright test ${runTarget}`, { stdio: 'inherit' });
