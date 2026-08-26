// Teknisk QA — kjører mot preview-serveren med systemets Edge (playwright-core).
// Dekker: konsollfeil, feilede forespørsler, horisontal overflow, fonter,
// interaksjoner (meny, sticky CTA, før/etter, FAQ, skjema), tastatur, lenker, assets.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4321';
const results = [];
let failures = 0;
const ok = (msg) => {
  results.push('PASS  ' + msg);
};
const fail = (msg) => {
  results.push('FAIL  ' + msg);
  failures++;
};

const routes = ['/', '/tjenester', '/priser', '/prosjekter', '/om-oss', '/faq', '/bestill-time', '/404'];
const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'desktop-1366', width: 1366, height: 768 },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
} catch {
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    fail('kunne ikke starte Edge/Chrome via playwright-core');
    process.exit(1);
  }
}

// ---------- 1. Ruter × viewport: konsoll, nettverk, overflow, fonter ----------
for (const vp of viewports) {
  for (const route of routes) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    const failedReqs = [];
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text());
    });
    page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) =>
      failedReqs.push(r.url() + ' :: ' + (r.failure()?.errorText ?? ''))
    );
    page.on('response', (r) => {
      if (r.status() >= 400) failedReqs.push(r.status() + ' ' + r.url());
    });

    try {
      await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const fonts = await page.evaluate(() => ({
        dm: document.fonts.check('400 16px "DM Sans Variable"'),
        bc: document.fonts.check('600 16px "Barlow Condensed"'),
      }));

      if (consoleErrors.length) fail(`${vp.name} ${route}: konsollfeil → ${consoleErrors.join(' | ')}`);
      else ok(`${vp.name} ${route}: ingen konsollfeil`);
      if (failedReqs.length) fail(`${vp.name} ${route}: feilede forespørsler → ${failedReqs.join(' | ')}`);
      else ok(`${vp.name} ${route}: ingen feilede forespørsler`);
      if (overflow > 0) fail(`${vp.name} ${route}: horisontal overflow på ${overflow}px`);
      else ok(`${vp.name} ${route}: ingen horisontal overflow`);
      if (!fonts.dm || !fonts.bc) fail(`${vp.name} ${route}: fonter mangler (DM=${fonts.dm} BC=${fonts.bc})`);
      else ok(`${vp.name} ${route}: fonter lastet`);
    } catch (e) {
      fail(`${vp.name} ${route}: unntak → ${e.message}`);
    }
    await ctx.close();
  }
}

// ---------- 2. Interaksjoner (mobil) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  // Mobilmeny: åpne → Escape → lukk
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.click('#menu-toggle');
  await page.waitForTimeout(350);
  const open = await page.evaluate(() => {
    const p = document.getElementById('mobile-menu');
    return !p.classList.contains('hidden') && p.getAttribute('aria-hidden') === 'false';
  });
  open ? ok('mobilmeny: åpnes') : fail('mobilmeny: åpnes ikke');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const closed = await page.evaluate(() =>
    document.getElementById('mobile-menu').classList.contains('hidden')
  );
  closed ? ok('mobilmeny: lukkes med Escape') : fail('mobilmeny: lukkes ikke med Escape');

  // Sticky CTA
  const ctaVisible = await page.evaluate(() => {
    const el = document.querySelector('.fixed.inset-x-0.bottom-0');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.height > 0 && getComputedStyle(el).display !== 'none';
  });
  ctaVisible ? ok('mobil: sticky CTA synlig') : fail('mobil: sticky CTA mangler');

  // Før/etter med tastatur
  await page.goto(BASE + '/#for-etter', { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const ba = await page.evaluate(() => {
    const input = document.querySelector('.ba-input');
    const root = document.querySelector('.beforeafter');
    if (!input || !root) return null;
    input.focus();
    return { before: root.style.getPropertyValue('--pos') };
  });
  if (ba) {
    await page.keyboard.press('ArrowRight');
    const after = await page.evaluate(() =>
      document.querySelector('.beforeafter').style.getPropertyValue('--pos')
    );
    ba.before !== after ? ok('før/etter: pil-taster endrer posisjon') : fail('før/etter: posisjon endres ikke');
  } else {
    fail('før/etter: komponent mangler på /#for-etter');
  }

  // FAQ
  await page.goto(BASE + '/faq', { waitUntil: 'load' });
  await page.click('details summary');
  const faqOpen = await page.evaluate(() => document.querySelector('details')?.open === true);
  faqOpen ? ok('FAQ: åpnes ved klikk') : fail('FAQ: åpnes ikke');

  // Skjema: tom innsending → valideringsfeil
  await page.goto(BASE + '/bestill-time', { waitUntil: 'load' });
  await page.click('#submit-btn');
  await page.waitForTimeout(150);
  const errCount = await page.evaluate(() => document.querySelectorAll('.field.has-error').length);
  const focused = await page.evaluate(() => document.activeElement?.id);
  errCount >= 3 ? ok(`skjema: ${errCount} valideringsfeil ved tom innsending`) : fail('skjema: ingen valideringsfeil');
  focused === 'navn' ? ok('skjema: fokus flyttes til første feil') : fail('skjema: feil fokus → ' + focused);

  // Skjema: quote-modus
  await page.selectOption('#service', 'ppf');
  await page.waitForTimeout(100);
  const quoteMode = await page.evaluate(() => ({
    quoteVisible: !document.getElementById('fs-quote').classList.contains('hidden'),
    directHidden: document.getElementById('fs-direct').classList.contains('hidden'),
    label: document.getElementById('submit-btn').textContent,
  }));
  quoteMode.quoteVisible && quoteMode.directHidden && quoteMode.label === 'Send prisoverslag'
    ? ok('skjema: quote-modus aktiveres for PPF')
    : fail('skjema: quote-modus feil → ' + JSON.stringify(quoteMode));

  // Skjema: gyldig innsending → suksess
  await page.fill('#navn', 'Ola Nordmann');
  await page.fill('#telefon', '900 00 000');
  await page.fill('#epost', 'ola@eksempel.no');
  await page.fill('#merke', 'VW Golf');
  await page.fill('#melding', 'Ønsker vurdering av coating');
  await page.click('#submit-btn');
  await page.waitForTimeout(200);
  const successShown = await page.evaluate(() => {
    const s = document.getElementById('form-success');
    return !s.classList.contains('hidden') && s.textContent.includes('Takk');
  });
  successShown ? ok('skjema: suksess-tilstand vises') : fail('skjema: suksess-tilstand mangler');

  // Forhåndsvalg via query
  await page.goto(BASE + '/bestill-time?tjeneste=keramisk-coating', { waitUntil: 'load' });
  const preselect = await page.evaluate(() => ({
    value: document.getElementById('service').value,
    quoteVisible: !document.getElementById('fs-quote').classList.contains('hidden'),
  }));
  preselect.value === 'keramisk-coating' && preselect.quoteVisible
    ? ok('skjema: forhåndsvalg fra URL virker')
    : fail('skjema: forhåndsvalg feil → ' + JSON.stringify(preselect));

  // Tastatur: skip-lenke
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  const skipFocused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  skipFocused === 'Hopp til innhold' ? ok('tastatur: skip-lenke får fokus') : fail('tastatur: skip-lenke → ' + skipFocused);

  await ctx.close();
}

// ---------- 3. Lenker og assets ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await ctx.newPage();
  const links = new Set();
  for (const route of ['/', '/tjenester', '/priser', '/prosjekter', '/om-oss', '/faq', '/bestill-time']) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => a.getAttribute('href'))
        .filter(Boolean)
    );
    for (const h of hrefs) {
      if (h.startsWith('#') || h.startsWith('tel:') || h.startsWith('mailto:')) continue;
      if (h.startsWith('http') && !h.startsWith(BASE)) continue; // eksterne (kart) sjekkes ikke
      links.add(new URL(h, BASE).pathname);
    }
  }
  let broken = 0;
  for (const p of links) {
    const r = await ctx.request.get(BASE + p);
    if (r.status() !== 200) {
      broken++;
      fail(`lenke: ${p} → ${r.status()}`);
    }
  }
  broken === 0 ? ok(`lenker: ${links.size} interne sider/sideresurser gir 200`) : fail('lenker: se over');

  const assets = ['/og-image.jpg', '/favicon.svg', '/manifest.webmanifest', '/robots.txt', '/sitemap-index.xml'];
  for (const a of assets) {
    const r = await ctx.request.get(BASE + a);
    r.status() === 200 ? ok(`asset: ${a} → 200`) : fail(`asset: ${a} → ${r.status()}`);
  }

  // JSON-LD på forsiden
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const jsonld = await page.evaluate(() => {
    const s = document.querySelector('script[type="application/ld+json"]');
    if (!s) return null;
    try {
      return JSON.parse(s.textContent);
    } catch {
      return 'ugyldig JSON';
    }
  });
  jsonld && jsonld['@type'] === 'AutoWash'
    ? ok('JSON-LD: AutoWash på forsiden er gyldig')
    : fail('JSON-LD: mangler eller ugyldig → ' + JSON.stringify(jsonld)?.slice(0, 80));

  // Reduced motion
  const ctxRm = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const pageRm = await ctxRm.newPage();
  const rmErrors = [];
  pageRm.on('pageerror', (e) => rmErrors.push(e.message));
  await pageRm.goto(BASE + '/', { waitUntil: 'load' });
  rmErrors.length ? fail('reduced-motion: feil → ' + rmErrors.join('|')) : ok('reduced-motion: ingen feil');
  await ctxRm.close();

  await ctx.close();
}

await browser.close();

console.log('\n=== QA-SUMMERING ===');
for (const r of results) console.log(r);
console.log(`\n${failures === 0 ? 'ALLE TESTER BESTÅTT' : failures + ' FEIL'}`);
process.exit(failures === 0 ? 0 : 1);
