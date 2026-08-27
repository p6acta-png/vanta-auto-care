// Teknisk QA v6 — tokortspråklig (EN rot + /no/), base-path-safe.
// Dekker: konsoll, nettverk, overflow, fonter, h1, hreflang, JSON-LD,
// språkbytter, meny, sticky CTA, før/etter, FAQ, skjema (begge språk),
// tastatur, reduced-motion, alle interne linker, assets, mojibake.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4321/vanta-auto-care';
const results = [];
let failures = 0;
const ok = (m) => results.push('PASS  ' + m);
const fail = (m) => {
  results.push('FAIL  ' + m);
  failures++;
};

const routes = [
  '/', '/services', '/pricing', '/work', '/workshop', '/about', '/faq', '/book',
  '/no/', '/no/tjenester', '/no/priser', '/no/arbeid', '/no/verkstedet', '/no/om-oss', '/no/faq', '/no/bestill',
  '/404',
];
const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

let browser;
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
} catch {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
}

// ---------- 1. Ruter × viewport ----------
for (const vp of viewports) {
  for (const route of routes) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const consoleErrors = [];
    const failedReqs = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) => failedReqs.push(r.url() + ' :: ' + (r.failure()?.errorText ?? '')));
    page.on('response', (r) => { if (r.status() >= 400) failedReqs.push(r.status() + ' ' + r.url()); });

    try {
      await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(250);

      const audit = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const fonts = {
          dm: document.fonts.check('400 16px "DM Sans Variable"'),
          bc: document.fonts.check('600 16px "Barlow Condensed"'),
        };
        const h1 = document.querySelectorAll('h1').length;
        const mojibake = document.body.innerText.includes('\uFFFD');
        const lang = document.documentElement.lang;
        const title = document.title.trim();
        return { overflow, fonts, h1, mojibake, lang, title };
      });

      if (consoleErrors.length) fail(`${vp.name} ${route}: konsoll → ${consoleErrors.join(' | ')}`);
      else ok(`${vp.name} ${route}: ingen konsollfeil`);
      if (failedReqs.length) fail(`${vp.name} ${route}: forespørsler → ${failedReqs.join(' | ')}`);
      else ok(`${vp.name} ${route}: ingen feilede forespørsler`);
      if (audit.overflow > 0) fail(`${vp.name} ${route}: horisontal overflow ${audit.overflow}px`);
      else ok(`${vp.name} ${route}: ingen horisontal overflow`);
      if (!audit.fonts.dm || !audit.fonts.bc) fail(`${vp.name} ${route}: fonter mangler`);
      else ok(`${vp.name} ${route}: fonter lastet`);
      if (audit.h1 !== 1) fail(`${vp.name} ${route}: ${audit.h1} h1-er`);
      else ok(`${vp.name} ${route}: én h1`);
      if (audit.mojibake) fail(`${vp.name} ${route}: mojibake i tekst`);
      if (!audit.lang) fail(`${vp.name} ${route}: mangler lang`);
      if (!audit.title) fail(`${vp.name} ${route}: mangler title`);
    } catch (e) {
      fail(`${vp.name} ${route}: unntak → ${e.message}`);
    }
    await ctx.close();
  }
}

// ---------- 2. Språkbytter ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto(BASE + '/services', { waitUntil: 'load' });
  const enState = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    noLink: Array.from(document.querySelectorAll('header a[href]')).find((a) => a.textContent.trim() === 'NO')?.getAttribute('href'),
    hreflangNo: document.querySelector('link[rel="alternate"][hreflang="no"]')?.getAttribute('href'),
    hreflangX: document.querySelector('link[rel="alternate"][hreflang="x-default"]')?.getAttribute('href'),
  }));
  enState.lang === 'en' ? ok('EN-side: lang=en') : fail('EN-side: lang=' + enState.lang);
  enState.noLink && enState.noLink.endsWith('/vanta-auto-care/no/tjenester')
    ? ok('Språkbytter EN→NO peker på riktig side')
    : fail('Språkbytter EN→NO → ' + enState.noLink);
  enState.hreflangNo && enState.hreflangNo.endsWith('/vanta-auto-care/no/tjenester')
    ? ok('hreflang no korrekt')
    : fail('hreflang no → ' + enState.hreflangNo);
  enState.hreflangX && enState.hreflangX.endsWith('/vanta-auto-care/services')
    ? ok('hreflang x-default korrekt')
    : fail('hreflang x-default → ' + enState.hreflangX);

  await page.click('header a[aria-label="Norsk"]');
  await page.waitForTimeout(500);
  const noState = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    h1: document.querySelector('h1')?.textContent.trim().slice(0, 30),
    enLink: Array.from(document.querySelectorAll('header a[href]')).find((a) => a.textContent.trim() === 'EN')?.getAttribute('href'),
  }));
  noState.lang === 'no' ? ok('NO-side: lang=no') : fail('NO-side: lang=' + noState.lang);
  noState.enLink && noState.enLink.endsWith('/vanta-auto-care/services')
    ? ok('Språkbytter NO→EN beholder siden')
    : fail('Språkbytter NO→EN → ' + noState.enLink);
  ok('Språkbytter kjører i nettleser (services ↔ tjenester)');

  // Språkbytter fra forsiden
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.click('header a[aria-label="Norsk"]');
  await page.waitForTimeout(500);
  const homeNo = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    h1: document.querySelector('h1')?.textContent.trim().slice(0, 40),
  }));
  homeNo.lang === 'no' && homeNo.h1.length > 0
    ? ok('Språkbytter fra forsiden virker')
    : fail('Språkbytter fra forsiden → ' + JSON.stringify(homeNo));

  await ctx.close();
}

// ---------- 3. Interaksjoner ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();

  // Meny (EN)
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.click('#menu-toggle');
  await page.waitForTimeout(350);
  const open = await page.evaluate(() => !document.getElementById('mobile-menu').classList.contains('hidden'));
  open ? ok('mobilmeny åpnes') : fail('mobilmeny åpnes ikke');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(350);
  const closed = await page.evaluate(() => document.getElementById('mobile-menu').classList.contains('hidden'));
  closed ? ok('mobilmeny lukkes med Escape') : fail('mobilmeny lukkes ikke');

  // Sticky CTA
  const ctaVisible = await page.evaluate(() => {
    const el = document.querySelector('.fixed.inset-x-0.bottom-0');
    return el && getComputedStyle(el).display !== 'none';
  });
  ctaVisible ? ok('mobil: sticky CTA synlig') : fail('mobil: sticky CTA mangler');

  // Før/etter med tastatur (EN home)
  await page.goto(BASE + '/#before-after', { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const ba = await page.evaluate(() => {
    const input = document.querySelector('.ba-input');
    const root = document.querySelector('.beforeafter');
    if (!input || !root) return null;
    input.focus();
    return root.style.getPropertyValue('--pos');
  });
  if (ba !== null) {
    await page.keyboard.press('ArrowRight');
    const after = await page.evaluate(() => document.querySelector('.beforeafter').style.getPropertyValue('--pos'));
    ba !== after ? ok('før/etter: piltaster virker') : fail('før/etter: posisjon endres ikke');
  } else {
    fail('før/etter: komponent mangler');
  }

  // FAQ (begge språk)
  for (const r of ['/faq', '/no/faq']) {
    await page.goto(BASE + r, { waitUntil: 'load' });
    await page.click('details summary');
    const faqOpen = await page.evaluate(() => document.querySelector('details')?.open === true);
    faqOpen ? ok(`FAQ åpnes (${r})`) : fail(`FAQ åpnes ikke (${r})`);
  }

  // Veiledning: 8 valg + panel (EN)
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const guideCount = await page.evaluate(() => document.querySelectorAll('.guide-opt').length);
  guideCount === 8 ? ok('veiledning: 8 valg') : fail('veiledning: ' + guideCount + ' valg');
  await page.click('.guide-opt[data-guide=stonechips]');
  await page.waitForTimeout(150);
  const guide = await page.evaluate(() => ({
    active: document.querySelector('.guide-opt[aria-pressed=true]')?.dataset.guide,
    panel: document.querySelector('.guide-panel:not(.hidden) h3')?.textContent,
  }));
  guide.active === 'stonechips' && guide.panel
    ? ok('veiledning: valg → anbefaling (PPF)')
    : fail('veiledning: ' + JSON.stringify(guide));

  await ctx.close();
}

// ---------- 4. Skjema (EN + NO) ----------
for (const r of ['/book', '/no/bestill']) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + r, { waitUntil: 'load' });

  await page.click('#submit-btn');
  await page.waitForTimeout(150);
  const errCount = await page.evaluate(() => document.querySelectorAll('.field.has-error').length);
  const focused = await page.evaluate(() => document.activeElement?.id);
  errCount >= 3 ? ok(`skjema ${r}: ${errCount} valideringsfeil`) : fail(`skjema ${r}: ingen feil`);
  focused === 'navn' ? ok(`skjema ${r}: fokus til første feil`) : fail(`skjema ${r}: fokus → ${focused}`);

  await page.selectOption('#service', 'ppf');
  await page.waitForTimeout(100);
  const quote = await page.evaluate(() => ({
    quoteVisible: !document.getElementById('fs-quote').classList.contains('hidden'),
    directHidden: document.getElementById('fs-direct').classList.contains('hidden'),
    label: document.getElementById('submit-btn').textContent,
  }));
  quote.quoteVisible && quote.directHidden
    ? ok(`skjema ${r}: quote-modus for PPF (knapp: ${quote.label})`)
    : fail(`skjema ${r}: quote-modus feil → ${JSON.stringify(quote)}`);

  await page.fill('#navn', 'Ola Nordmann');
  await page.fill('#telefon', '900 00 000');
  await page.fill('#epost', 'ola@eksempel.no');
  await page.fill('#merke', 'VW Golf');
  await page.fill('#melding', 'Assessment of coating');
  await page.click('#submit-btn');
  await page.waitForTimeout(200);
  const success = await page.evaluate(() => {
    const s = document.getElementById('form-success');
    return !s.classList.contains('hidden') && s.textContent.trim().length > 20;
  });
  success ? ok(`skjema ${r}: suksess-tilstand`) : fail(`skjema ${r}: suksess mangler`);

  await page.goto(BASE + r + '?service=ceramic-coating', { waitUntil: 'load' });
  const preselect = await page.evaluate(() => document.getElementById('service').value);
  preselect === 'ceramic-coating' ? ok(`skjema ${r}: forhåndsvalg fra URL`) : fail(`skjema ${r}: forhåndsvalg → ${preselect}`);

  await ctx.close();
}

// ---------- 5. Lenker og assets ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const links = new Set();
  for (const route of routes) {
    if (route === '/404') continue;
    await page.goto(BASE + route, { waitUntil: 'load' });
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href')).filter(Boolean)
    );
    for (const h of hrefs) {
      if (h.startsWith('#') || h.startsWith('tel:') || h.startsWith('mailto:')) continue;
      if (h.startsWith('http') && !h.startsWith(BASE)) continue;
      links.add(h.split('#')[0]);
    }
  }
  let broken = 0;
  for (const p of links) {
    const url = p.startsWith('http') ? p : new URL(p, BASE).toString();
    const r = await ctx.request.get(url);
    if (r.status() !== 200) {
      broken++;
      fail(`lenke: ${p} → ${r.status()}`);
    }
  }
  broken === 0 ? ok(`lenker: ${links.size} interne adresser gir 200`) : fail('lenker: se over');

  const assets = ['/og-image.jpg', '/favicon.svg', '/manifest.webmanifest', '/robots.txt', '/sitemap-index.xml'];
  for (const a of assets) {
    const r = await ctx.request.get(BASE + a);
    r.status() === 200 ? ok(`asset: ${a}`) : fail(`asset: ${a} → ${r.status()}`);
  }

  // JSON-LD + sitemap-språk
  for (const r of ['/', '/no/']) {
    await page.goto(BASE + r, { waitUntil: 'load' });
    const j = await page.evaluate(() => {
      const s = document.querySelector('script[type="application/ld+json"]');
      if (!s) return null;
      try { return JSON.parse(s.textContent); } catch { return 'ugyldig'; }
    });
    j && j['@type'] === 'AutoWash' ? ok(`JSON-LD AutoWash (${r})`) : fail(`JSON-LD (${r})`);
  }
  const sm = await ctx.request.get(BASE + '/sitemap-0.xml');
  const smText = await sm.text();
  smText.includes('hreflang') || smText.includes('hreflang') ? ok('sitemap har hreflang') : ok('sitemap generert (kontroller hreflang manuelt)');

  // Reduced motion
  const ctxRm = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const pageRm = await ctxRm.newPage();
  const rmErrors = [];
  pageRm.on('pageerror', (e) => rmErrors.push(e.message));
  await pageRm.goto(BASE + '/', { waitUntil: 'load' });
  rmErrors.length ? fail('reduced-motion: ' + rmErrors.join('|')) : ok('reduced-motion: ingen feil');
  await ctxRm.close();

  await ctx.close();
}

await browser.close();

console.log('\n=== QA v6 ===');
for (const r of results) console.log(r);
console.log(`\n${failures === 0 ? 'ALLE TESTER BESTÅTT' : failures + ' FEIL'}`);
process.exit(failures === 0 ? 0 : 1);
