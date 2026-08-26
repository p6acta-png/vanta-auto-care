# VANTA Auto Care — demo-nettside

Produksjonsklar demoside for et fiktivt premium bilpleieverksted i Oslo
(bilpleie, polering, lakkorrigering, keramisk coating, PPF).

> **Obs:** VANTA Auto Care er et fiktivt selskap. Alt innhold — priser,
> telefonnummer, adresse og bilder — er demoinnhold.

## Teknisk

- [Astro 5](https://astro.build) (statisk, ingen runtime JS utover små skript)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- TypeScript
- Fonter: `@fontsource-variable/dm-sans` + `@fontsource/barlow-condensed`
- Ikoner: `@lucide/astro`
- Bildeoptimalisering: Astro `astro:assets` (sharp)
- SEO: `@astrojs/sitemap`, JSON-LD (LocalBusiness/AutoWash), Open Graph

## Kommandoer

```bash
pnpm install
pnpm dev          # utviklingsserver
pnpm build        # produksjonsbygg til dist/
pnpm preview      # forhåndsvis bygget
pnpm check        # TypeScript-sjekk (astro check)
pnpm og           # genererer public/og-image.jpg på nytt
node scripts/qa.mjs   # teknisk QA (krever preview-server + Edge/Chrome)
```

## Hvor du redigerer innhold

Alt redigerbart innhold ligger samlet i **`src/data/site.ts`**:

- firmanavn, adresse, telefon, e-post, åpningstider, kartlenker
- tjenester (navn, beskrivelse, inkludert arbeid, startpris, varighet,
  direkte bestilling vs. prisoverslag)
- bilstørrelser og prisoversikt
- prosess, FAQ og prisdisclaimer

Bilder importeres i `src/data/images.ts` (se `docs/image-sources.md` for
kilder og lisens).

## Sider

| Rute | Innhold |
|---|---|
| `/` | Hero, posisjon, tjenesteoversikt, arbeidsmåte, før/etter, priser, prosess, prosjekter, lokasjon, CTA |
| `/tjenester` | Alle behandlinger med detaljer |
| `/priser` | Prismatrise per bilstørrelse + forklaring |
| `/prosjekter` | Eksempel-galleri (eksempelfoto) |
| `/om-oss` | Verkstedet og arbeidsprinsipper |
| `/faq` | Vanlige spørsmål |
| `/bestill-time` | Direkte bestilling + prisoverslag (front-end) |
| `/404` | Tilpasset 404 |

## Fremtidige integrasjoner

`site.integrations` i `src/data/site.ts` inneholder tomme sømmer for
booking-leverandør, betaling, analyse og e-post — ingen backend finnes i
demoen. Kartseksjonen har lenke-CTAs (Google/Apple Maps) klare for en ekte
embed senere.
