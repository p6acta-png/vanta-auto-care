// Sentral bildeimport for Astro Image-optimalisering.
// Alt-tekster er lokalisert og ligger i src/i18n/ (content.alt).
// Se docs/image-sources.md for kilder og lisens.
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

export type ImageKey = keyof typeof images;
