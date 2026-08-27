import type { Locale } from './index';

export type ServiceCategory = 'exterior' | 'interior' | 'paint' | 'protection';

export interface ServiceL10n {
  slug: string; // stabil ID, lik i begge språk
  category: ServiceCategory;
  name: string;
  short: string; // én setning — fordelsbeskrivelse
  description: string;
  includes: string[];
  suitedFor: string;
  priceFrom: string;
  duration: string;
  booking: 'direct' | 'quote';
  sizeDependent: boolean;
}

export interface GuideOption {
  id: string;
  label: string;
  desc: string;
  target: string | null; // service-slug eller null (usikker)
  note: string;
}

export interface LocaleContent {
  lang: Locale;
  htmlLang: string;
  alt: Record<string, string>;
  meta: Record<string, { title: string; description: string }>;
  nav: { href: string; label: string }[];
  ui: {
    book: string;
    quote: string;
    skip: string;
    menuOpen: string;
    menuClose: string;
    demo: string;
    details: string;
    mapsGoogle: string;
    mapsApple: string;
    mapNote: string;
    allServices: string;
  };
  hero: {
    kicker: string;
    titleA: string;
    titleB: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    spec: { label: string; value: string; href?: string }[];
  };
  statement: { title: string; text: string; link: string };
  categories: { id: ServiceCategory; label: string; desc: string }[];
  sizeClasses: string[];
  services: ServiceL10n[];
  catalogue: {
    kicker: string;
    title: string;
    intro: string;
    bestFor: string;
    included: string;
    seePricing: string;
    premiumKicker: string;
    premiumTitle: string;
    premiumText: string;
    premiumCta: string;
  };
  guide: {
    kicker: string;
    title: string;
    sub: string;
    options: GuideOption[];
    recommended: string;
    fromPrice: string;
    time: string;
    more: string;
    unsureTitle: string;
    unsureText: string;
    freeNote: string;
  };
  beforeAfter: {
    kicker: string;
    title: string;
    sub: string;
    labelBefore: string;
    labelAfter: string;
    note: string;
    sliderLabel: string;
  };
  narrative: {
    kicker: string;
    title: string;
    steps: { id: string; label: string; note: string; image: 'interior' | 'foam' | 'wash' | 'paint' | 'garage' | 'road' | 'ppf' | 'pressure' | 'wheel' }[];
    text: string;
    link: string;
  };
  finalCta: { title: string; text: string };
  pricing: {
    kicker: string;
    title: string;
    sub: string;
    factorsKicker: string;
    factorsTitle: string;
    sizeNote: string;
    tableCaption: string;
    tableService: string;
    tableNote: string;
    ctaList: string;
    ctaQuote: string;
    disclaimer: string;
    demoNote: string;
  };
  work: {
    kicker: string;
    title: string;
    intro: string;
    link: string;
    items: { title: string; note: string; image: 'paint' | 'wash' | 'interior' | 'ppf' | 'wheel' | 'foam' | 'pressure' | 'road' | 'garage'; span: string; cls: string }[];
  };
  workshopPage: {
    kicker: string;
    title: string;
    intro: string;
    principlesKicker: string;
    principlesTitle: string;
    principles: { title: string; text: string }[];
    visitKicker: string;
    visitTitle: string;
    visitText: string;
  };
  aboutPage: {
    kicker: string;
    title: string;
    paragraphs: string[];
    imageCaption: string;
    principlesKicker: string;
    principlesTitle: string;
    principles: { title: string; text: string }[];
    visitKicker: string;
    visitTitle: string;
    visitText: string;
  };
  faqPage: { kicker: string; title: string; intro: string; moreTitle: string; moreText: string };
  bookPage: {
    kicker: string;
    title: string;
    intro: string;
    path1Kicker: string;
    path1Title: string;
    path1Text: string;
    path2Kicker: string;
    path2Title: string;
    path2Text: string;
    processKicker: string;
    processTitle: string;
    callPrompt: string;
    bottomText: string;
  };
  form: {
    service: string;
    serviceHintDirect: string;
    serviceHintQuote: string;
    optDirect: string;
    optQuote: string;
    name: string;
    namePh: string;
    nameErr: string;
    phone: string;
    phonePh: string;
    phoneErr: string;
    email: string;
    emailPh: string;
    emailErr: string;
    car: string;
    carPh: string;
    carErr: string;
    year: string;
    yearPh: string;
    reg: string;
    regPh: string;
    date: string;
    dateErr: string;
    time: string;
    timePh: string;
    timeErr: string;
    timeHint: string;
    message: string;
    messagePh: string;
    photos: string;
    photosHint: string;
    submitDirect: string;
    submitQuote: string;
    demoNote: string;
    successTitle: string;
    successDirect: string;
    successQuote: string;
    successStep1: string;
    successStep2: string;
    successStep3: string;
    successDemo: string;
    reset: string;
  };
  faqs: { q: string; a: string }[];
  priceFactors: { title: string; text: string }[];
  processSteps: { step: string; title: string; text: string }[];
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    hoursTitle: string;
    credits: string;
  };
  hours: { label: string; value: string }[];
  notFound: { kicker: string; title: string; text: string; home: string; book: string };
}
