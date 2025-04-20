export const locators = {
    home: {
        searchToggle: 'button.js-search-trigger.search-trigger--main',
        searchInput: 'input.mobile-search__input',
        searchSubmit: 'xpath=//*[@id="mobile-search"]/div/div/div/form/button',
        gameCardByName: (name: string) => `div.game-preview__content-wrapper:has-text("${name}")`,
        tryDemoButtonInsideCard: 'button.js-iframe-modal-trigger',
        over18Button: '#ageOver',
        gameIframe: 'iframe#js-modal-iframe',
        cookiesYes: 'button.cky-btn-accept',
    },

    cookiesLocator: {
        coockiesAccept: 'button.cky-btn-accept',
    },

    iFrame: {
        frame: 'iframe[title="Iframe Content"]',
    },

    settings: {
        gameInfoButton: 'text=/game info/i',
        gameRulesButton: 'text=/game rules/i',
        closeButton: 'div.pageActive-0-2-43 div[class*="closeIcon"]',
    },

    sidebarContent: 'div[class*="pageActive"] div[class*="rulesContent"]',
    rulesContent: 'div[class*="rulesContent"]',
    closeGameButton: 'svg.custom-modal__close-icon',
};
