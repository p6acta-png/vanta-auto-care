# Interne forskningsnotater — VANTA Auto Care (demo)

Oppsummert research før implementasjon. Skrevet som internt kontekst, ikke for kunden.

## Konkurrenter studert

| Selskap | Sted | Fokus | Strukturelle funn |
|---|---|---|---|
| Noredetail (noredetail.no) | Oslo | PPF, keramisk coating, polering | «Startpriser – uten full priskatalog»; beslutningshjelp («Velg det som faktisk løser problemet»); hub-struktur; prosessstrip «Fra forespørsel til ferdig bil»; FAQ; aggressiv CTA-struktur; mange menypunkter (8+) |
| Asker Auto Spa (askerautospa.no) | Asker | XPEL PPF, keramisk coating | Korte hero-claims («Beskytt bilen. Bevar følelsen.»); tjeneste-seksjoner; «Du leverer bilen til mennesker, ikke en kjede»; skjema-fokusert kontakt |
| Car Spa AS (car-spa.no) | Oslo/Asker–Bærum | Kjede/kompetansesenter, kurs, forhandlere | Merkevare-tung, mange underaktiviteter; mindre tydelig prisvei |
| Selma Bilpleie / Nye Ryen (letsdeal.no) | Oslo (Økern) | Vask/deals | Priseksempler: utvendig 499 kr, innv+utv 999 kr (deal-priser) |
| SjekkScore bilpleie Oslo | — | Prisoversikt | Markedsspenn: vask 600–800 kr, detailing 2 000–4 000 kr |
| Show Off AS | Oslo | PPF/foliering (nå også skilt) | Blogg «Hva koster PPF»; prisinnsikt i innhold |

Reelle prisankere i markedet (2025/26): PPF fra ~19 990 kr, keramisk coating fra ~7 999 kr, maskinpolering fra ~2 900 kr, vask 500–1 200 kr.

## 1. Vanlige svakheter hos konkurrenter

- **Skjulte priser**: flere krever kontakt for alt; prislisten ligger bak verktøy/skjemaer («se pakkepriser»).
- **Uklare tjenesteforskjeller**: vask vs. dyprens vs. polering vs. coating flyter sammen; kunde må gjette.
- **Overlesset meny**: 8+ toppnivå-punkter, egne sider for hvert produkt (XPEL, Steinsprutpakken…).
- **Svak mobile CTA**: booking ligger langt ned; lite sticky/flytende handling på mobil.
- **Utydelig bestilling vs. tilbud**: alt sendes gjennom samme «tilbud»-skjema, også enkle vasker.
- **Generiske bilder**: blanding av stock-stiler; lite sammenhengende visuelt språk.
- **Overdrevne claims**: «Norges fremste kompetansesenter», Google-stjerner uten kontekst.
- **Vaskehall-fokus**: mange driver fortsatt «vask og ferdig»-modellen, lite håndverk-formidling.

## 2. Sterkeste kommersielle mønstre

- «Startpriser» — viser prisnivå uten å love noe (transparens-anker).
- Beslutningshjelp: «Velg det som faktisk løser problemet» / «Usikker? Få anbefalt behandling».
- Prosess-strip «Fra forespørsel til ferdig bil» — senker usikkerhet.
- FAQ nær konvertering.
- Kort, konkret hero med én klar CTA-retning.

## 3. Sterkeste visuelle mønstre

- Mørke, kontrollerte bilder av lakken — glans som bevis.
- Enkel typografi, mye luft; «verksted-editortial» heller enn SaaS-side.
- Korte avsnitt; lister over inkludert arbeid.
- Fysisk adresse + åpningstider synlig (lokal tillit).

## 4. Hvordan VANTA slår dem (designvalg i denne bygget)

1. **Priser på overflaten** — alle startpriser i vanlige listerader, ingen verktøy-gimmicks.
2. **To tydelige veier** — direkte bestilling for forutsigbare behandlinger; prisoverslag for polering/coating/PPF (bevisst forretningsvalg, forklart i UI).
3. **Én tjenesteliste med konsistente svar** — hva, hvem passer det, hva inngår, startpris, varighet, hva som påvirker pris.
4. **Bilstørrelse forklart** (mellomstor/stor/SUV/varebil) — få konkurrenter gjør dette eksplisitt.
5. **Mørk, sammenhengende foto-retning** (6 bilder, samme «språk»), aldri fake «kundebilder».
6. **Rolig, redaksjonell typografi** (DM Sans + Barlow Condensed), ingen card-gitter.
7. **Ingen fabrikerte tillitssignaler** — ingen stjerner, priser, kundelogos eller «år i bransjen».
8. **Lokasjon som konvertering** — adresse, timer, parkering, Google/Apple Maps-CTAs, ingen fake embed.
9. **Redusert meny** — 5 punkter + én primær CTA.

## Redesign-runde 2 — interne notater

Frisket research mot samme konkurrentsett (Noredetail, Asker Auto Spa, Car Spa,
Show Off, SjekkScore) før redesignet. Kommersielle mønstre bekreftet og brukt:
startpriser synlig tidlig, «to veier» (direkte bestilling vs. vurdering),
tydelig størrelses-håndtering.

**Diagnose av versjon 1:** teknisk solid, men «AI-kompetent» — lik
seksjonspadding overalt, samme overskriftsgrammatikk i hver seksjon,
hover-farger og piler som dekorasjon, standard fullbredde-hero med
bunnskråning, tjenestebilder som ikke avbildet tjenesten.

**Redesignvalg:**
1. Hero → delt komposisjon (tekst på papir + bilde til høyre, ingen gradient),
   kobberfargede punktum som eneste typografiske aksent.
2. Tjenester → tett indeks med priser («Det vi gjør — og hva det koster»);
   pris synlig umiddelbart, ingen hover-dekorasjon.
3. Før/etter → mørk, prominent seksjon tidlig på siden («Eksempel på resultat»).
4. Priser → forklaring + minitabell (størrelse) + «Se full prisliste».
5. Arbeidsmåte → asymmetrisk bilde/tekst med fakta-rader (dl, hårfine linjer).
6. Tjenesteside → innholdsindeks med priser øverst, vekslende bildeplassering,
   «Neste steg» per tjeneste (bestill vs. prisoverslag).
7. Priser/om-oss → vertikale lister i stedet for 4-kolonne-gitter.
8. Fotografi → tjeneste-spesifikt: håndvask (CC BY 4.0), aktivt skum
   (CC BY-SA 3.0), PPF-montering (CC BY-SA 4.0), felg-nærbilde (CC BY-SA 3.0);
   polering/coating uten lisensiert «påføringsfoto» → resultatbilde med ærlig
   billedtekst. Kreditering i footer.
9. Fjerning: SectionHead/ServiceRows (ubrukt), hover-bakgrunner, piler,
   skygge på skjema, dekorativ SVG-kartillustrasjon.
