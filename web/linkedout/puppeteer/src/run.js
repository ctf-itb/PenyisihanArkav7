const puppeteer = require("puppeteer");
const axios = require("axios");

const linkedoutBaseUrl = process.env.BASE_URL;
const userAgent = process.env.USER_AGENT;
const adminSecret = process.env.ADMIN_SECRET;

const loadXssPage = async () => {
  // prepare for headless chrome
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  page.on("dialog", (dialog) => dialog.dismiss());

  await page.setRequestInterception(true);
  page.on("request", (r) => {
    if (r.resourceType() === "document" && !r.url().startsWith(linkedoutBaseUrl)) {
      return;
    }
    return r.continue();
  });

  // set user agent (override the default headless User Agent)
  await page.setUserAgent(userAgent);

  // go to redir internal
  await page.goto(`${linkedoutBaseUrl}/_internal_a7/redir.php?secret=${adminSecret}`);
  await page.waitFor(5000);

//   await page.screenshot({ path: "example.png" });

  await browser.close();
};

const cleanup = async () => {
    await axios.get(`${linkedoutBaseUrl}/_internal_a7/cleanup.php`, { headers: { 'User-Agent': userAgent, 'X-Arkav7-Secret': adminSecret }});
};

const run = () => {
    console.log("Running cycle...");
    loadXssPage()
        .then(() => {
            return cleanup();
        })
        .then(() => {
            console.log("Cycle complete");
        })
        .catch(e => {
            console.error(e);
        });
}

const runInterval = 5 * 60 * 1000;
setInterval(run, runInterval);
run();