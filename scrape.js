import puppeteer from "puppeteer";
import tweetRates from './tweet.js'

const getRates = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true, // Running in headless mode for performance
            timeout: 120000 // Increased timeout to handle slower connections
        });
        
        const page = await browser.newPage();
        
        await page.goto("https://abokiforex.app/", {
            waitUntil: "networkidle2",
            timeout: 120000
        });
        
        // Wait for each element to ensure it's loaded
        await Promise.all([
            page.waitForSelector('#usdBuy', { timeout: 10000 }),
            page.waitForSelector('#gbpBuy', { timeout: 10000 }),
            page.waitForSelector('#eurBuy', { timeout: 10000 }),
            page.waitForSelector('#cadBuy', { timeout: 10000 })
        ]);

        // Extract the rates
        const rates = await page.evaluate(() => {
            const getElementText = (selector) => document.querySelector(selector)?.textContent.trim() || 'Not available';
            
            return {
                usdRates: getElementText('#usdBuy'),
                poundRates: getElementText('#gbpBuy'),
                euroRates: getElementText('#eurBuy'),
                cadRates: getElementText('#cadBuy')
            };
        });
        
        console.log(rates);
        await tweetRates(rates)
    } catch (error) {
        console.error("Error occurred while scraping the rates:", error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

getRates();
