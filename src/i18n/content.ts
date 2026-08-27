import type { Locale } from './index';
import type { LocaleContent } from './types';
import { en } from './en';
import { no } from './no';

export type { LocaleContent, ServiceL10n, ServiceCategory, GuideOption } from './types';

export const content: Record<Locale, LocaleContent> = { en, no };

export function getContent(locale: Locale): LocaleContent {
  return content[locale];
}

// Stabil hjelper for å finne en tjeneste i et gitt språk
export function serviceBySlug(locale: Locale, slug: string) {
  return content[locale].services.find((s) => s.slug === slug) ?? null;
}
