// Sentral bildeimport for Astro Image-optimalisering.
// Se docs/image-sources.md for kilder, lisens og kreditering.
import hero from '../assets/img/hero.jpg';
import paint from '../assets/img/paint.jpg';
import wash from '../assets/img/wash.jpg';
import foam from '../assets/img/foam.jpg';
import pressure from '../assets/img/pressure.jpg';
import interior from '../assets/img/interior.jpg';
import wheel from '../assets/img/wheel.jpg';
import ppf from '../assets/img/ppf.jpg';
import garage from '../assets/img/garage.jpg';
import road from '../assets/img/road.jpg';

export const images = {
  hero,
  paint,
  wash,
  foam,
  pressure,
  interior,
  wheel,
  ppf,
  garage,
  road,
};

export const imageAlt: Record<string, string> = {
  hero: 'Mørk bil med frontlysene på i et parkeringshus',
  paint: 'Polert mørk bil — eksempel på lakkarbeid',
  wash: 'Bil som håndvaskes ved et bilpleieanlegg',
  foam: 'Aktivt skum på bil under vask',
  pressure: 'Høytrykksvask av mørk bil',
  interior: 'Bilinteriør i mørke toner',
  wheel: 'Felg på bil, nærbilde',
  ppf: 'Montering av PPF-film på bilpanser',
  garage: 'Mørk sportsbil parkert i garasje',
  road: 'Klassisk sportsbil på vei',
};
