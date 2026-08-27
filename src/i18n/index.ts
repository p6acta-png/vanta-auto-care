// ============================================================
// VANTA Auto Care — i18n-kjerne
// EN er standardspråk (rot). NO ligger under /no/.
// Alle interne linker går gjennom withBase() i src/utils/links.ts
// (én sentral base-sti-logikk for GitHub Pages).
// ============================================================

import { withBase } from '../utils/links';

export type Locale = 'en' | 'no';

export const locales: { code: Locale; label: string; htmlLang: string }[] = [
  { code: 'en', label: 'EN', htmlLang: 'en' },
  { code: 'no', label: 'NO', htmlLang: 'no' },
];

export const defaultLocale: Locale = 'en';

// Ruteoversettelser for språkbytter: EN-sti → NO-sti
const routeMap: Record<string, string> = {
  '/': '/no/',
  '/services': '/no/tjenester',
  '/pricing': '/no/priser',
  '/work': '/no/arbeid',
  '/workshop': '/no/verkstedet',
  '/about': '/no/om-oss',
  '/faq': '/no/faq',
  '/book': '/no/bestill',
};

// Normaliserer en sti (base-strippet) til EN-stien
export function toEnPath(path: string): string {
  const p = path.replace(/\/+$/, '') || '/';
  if (p === '/no' || p.startsWith('/no/')) {
    const noPath = p === '/no' ? '/no/' : p;
    const en = Object.entries(routeMap).find(([, v]) => v === noPath)?.[0];
    if (en) return en;
    return '/';
  }
  return p;
}

// Språkbytter: gir rot-relativ sti for samme side på målspråket.
// Kallere bruker withBase() rundt resultatet.
export function switchLocale(currentPath: string, to: Locale): string {
  const en = toEnPath(currentPath);
  if (to === 'en') return en;
  return routeMap[en] ?? '/no/';
}

// Rot-relativ sti for en EN-sti i valgt språk (brukes av navigasjon)
export function toLocalePath(locale: Locale, enPath: string): string {
  if (locale === 'en') return enPath;
  return routeMap[enPath] ?? '/no/';
}

// Absolutt URL for metadata (kanonisk, hreflang, OG)
export function absUrl(origin: string, path: string): string {
  return origin.replace(/\/+$/, '') + withBase(path);
}

// Språk-URL-par for hreflang
export function langUrls(origin: string, enPath: string) {
  return {
    en: absUrl(origin, enPath),
    no: absUrl(origin, routeMap[enPath] ?? '/no/'),
  };
}
