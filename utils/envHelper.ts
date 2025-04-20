import dotenv from 'dotenv';
dotenv.config();

export const config = {
    BASE_URL: process.env.BASE_URL || 'https://www.avatarux.com',
    PLATFORM: process.env.PLATFORM || 'web',
    LANGUAGE: process.env.LANGUAGE || 'english',
    BROWSER: process.env.PLATFORM || 'web',
    SUITE: process.env.SUITE || 'sanity',
    TEST: process.env.TEST || '',
    COMPONENTS: process.env.COMPONENTS || 'all'
};