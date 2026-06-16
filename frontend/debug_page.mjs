import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("console", (msg) => console.log("CONSOLE:", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("PAGEERROR:", err.message));

await page.goto("http://localhost:5183/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(2000);

const html = await page.content();
console.log("HTML length:", html.length);
console.log(html.slice(0, 2000));

await page.screenshot({ path: "debug.png", fullPage: false });
await browser.close();
