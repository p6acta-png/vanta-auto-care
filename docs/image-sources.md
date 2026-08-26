# Bildedokumentasjon — VANTA Auto Care (demo)

Alle bilder er eksempelfoto/illustrasjoner — de forestiller IKKE ekte kunder
eller ekte arbeid fra VANTA (fiktiv demo). Bildene er optimalisert og
skalert av Astro (sharp) ved bygg.

## Unsplash (images.unsplash.com) — Unsplash-lisens (gratis, ingen kreditering)

| Fil | Photo-id | Rolle | Alt-tekst (norsk) |
|---|---|---|---|
| `src/assets/img/hero.jpg` | photo-1489824904134-891ab64532f1 | Hero — mørk bil i parkeringshus | «Mørk bil med frontlysene på i et parkeringshus» |
| `src/assets/img/paint.jpg` | photo-1525609004556-c46c7d6cf023 | Polert lakk / før-etter | «Polert mørk bil — eksempel på lakkarbeid» |
| `src/assets/img/interior.jpg` | photo-1580273916550-e323be2ae537 | Innvendig behandling | «Bilinteriør i mørke toner» |
| `src/assets/img/garage.jpg` | photo-1617788138017-80ad40651399 | Verkstedmiljø | «Mørk sportsbil parkert i garasje» |
| `src/assets/img/road.jpg` | photo-1553440569-bcc63803a83d | Galleri — lakk og finish | «Klassisk sportsbil på vei» |

## Wikimedia Commons (upload.wikimedia.org) — CC-lisens, krediteres i footer

| Fil | Commons-fil | Lisens | Rolle |
|---|---|---|---|
| `src/assets/img/wash.jpg` | «Virino lavas la aŭton Honda CR-V en aŭtolavejo (Tjumeno).jpg» | CC BY 4.0 | Utvendig vask — håndvask ved bilpleieanlegg |
| `src/assets/img/foam.jpg` | «Aktivschaum.JPG» | CC BY-SA 3.0 | Vask — aktivt skum |
| `src/assets/img/pressure.jpg` | «A person operates a pressure washer to clean a black car…jpg» | CC BY 2.0 | Vask — høytrykk på mørk bil |
| `src/assets/img/ppf.jpg` | «Установка антигравийной пленки на капот.jpg» | CC BY-SA 4.0 | PPF — montering av film på panser |
| `src/assets/img/ppf2.jpg` | «Paint protection Film.jpg» | CC BY-SA 4.0 | PPF — reservebilde |
| `src/assets/img/wheel.jpg` | «Renault Captur wheel closeup.jpg» | CC BY-SA 3.0 | Felg — nærbilde |

Kreditering vises i footeren: «Eksempelfoto: Unsplash · Wikimedia Commons
(CC BY / CC BY-SA)».

## Merknader om bildevalg (tjeneste-spesifikk mapping)

- **Utvendig bilpleie** → `wash.jpg` (håndvask) + `foam.jpg` (skum) + `pressure.jpg`.
- **Innvendig dyprens** → `interior.jpg` (mørkt interiør — resultatbilde).
- **Lakkrens/polering & lakkorrigering** → `paint.jpg` (polert lakk — resultatbilde;
  ingen lisensiert maskinpoleringsfoto funnet på Commons/Openverse).
- **Keramisk coating** → ingen dedikert illustrasjon (ingen lisensiert
  påføringsfoto funnet) — seksjonen er tekstbasert.
- **Felgrens** → `wheel.jpg` (felg-nærbilde; ingen lisensiert felgvask-foto funnet).
- **PPF** → `ppf.jpg` (faktisk filmmontering på panser).
- **Før/etter** bruker `paint.jpg` med simulert «før»-side (CSS-filter) —
  tydelig merket «Eksempel på resultat. Før-bildet er simulert».

## Åpenhetsnotat

- Ingen bilder er manipulert utover standard crop i komposisjonen.
- Bilder med CC-lisens er ikke endret innholdsmessig (kun beskjæring/komprimering).
- Hvis ekte kundefoto erstatter stock i en fremtidig versjon: oppdater
  alt-tekster og fjern «Eksempelfoto»-merkene.
