export const config = {

    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],

    maxInstances: 10,

    capabilities: [{
        // capabilities for local browser web tests
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-infobars',
                '--disable-notifications',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--start-maximized',

            ]
        },
    }],

    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',

    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    // Test runner services
    services: ['chromedriver'],

    framework: 'mocha',

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // =====
    // Hooks
    // =====

    before: async function (capabilities, specs) {
        try {
            // Define credentials for Basic Authentication
            const username = 'sl';
            const password = 'AttilaMate';
            const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

            // Navigate to the URL with the Authorization header using WebDriverIO
            await browser.url('https://bayut-uae-31293.ra.dubizzle.dev/', {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });

            console.log('Successfully navigated to the URL with Authorization header');

            // Get the Puppeteer instance from the browser object
            const puppeteerBrowser = await browser.getPuppeteer();
            const pages = await puppeteerBrowser.pages();

            // Find the correct page to focus on
            let page;
            for (const p of pages) {
                const url = await p.url();
                if (url.includes('bayut-uae-31293.ra.dubizzle.dev')) {
                    page = p;
                    break;
                }
            }

            if (!page) {
                throw new Error('Failed to find the correct Puppeteer page.');
            }

            // Bring the page to focus
            await page.bringToFront();

            // Enable request interception and block the requests sent to https://ovation-bayut-development.dubizzle.dev
            await page.setRequestInterception(true);
            page.on('request', (interceptedRequest) => {
                if (interceptedRequest.url().includes('https://ovation-bayut-development.dubizzle.dev')) {
                    console.log(`Blocked request to: ${interceptedRequest.url()}`);
                    interceptedRequest.abort();
                } else {
                    interceptedRequest.continue();
                }
            });

        } catch (error) {
            console.error('Error during navigation and setup:', error);
        }
    }
}
