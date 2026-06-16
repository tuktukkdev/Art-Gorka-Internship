import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5183/", { waitUntil: "networkidle", timeout: 60000 });

const slider = page.locator(".about__slider");
await slider.waitFor();

// Screenshot before drag
await page.screenshot({ path: "slider_before.png" });
await slider.screenshot({ path: "slider_only_before.png" });

const box = await slider.boundingBox();
console.log("slider box:", box);

const scrollBefore = await slider.evaluate((el) => el.scrollLeft);
console.log("scrollLeft before:", scrollBefore);

// check computed gap and padding/margin
const styles = await slider.evaluate((el) => {
  const cs = getComputedStyle(el);
  return {
    gap: cs.gap,
    padding: cs.padding,
    margin: cs.margin,
    overflowX: cs.overflowX,
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
  };
});
console.log("slider styles:", styles);

const itemStyles = await slider.evaluate((el) => {
  const item = el.querySelector(".about__slider-item");
  const cs = getComputedStyle(item);
  return { width: cs.width, margin: cs.margin, padding: cs.padding };
});
console.log("item styles:", itemStyles);

// Drag horizontally
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.mouse.down();
await page.mouse.move(box.x + box.width / 2 - 300, box.y + box.height / 2, { steps: 10 });
await page.mouse.up();

const scrollAfter = await slider.evaluate((el) => el.scrollLeft);
console.log("scrollLeft after drag:", scrollAfter);

await page.screenshot({ path: "slider_after.png" });
await slider.screenshot({ path: "slider_only_after.png" });

await browser.close();
