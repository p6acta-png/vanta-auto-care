// ============================================================
// VANTA Auto Care — sentral datakilde (single source of truth)
// Alt redigerbart innhold samles her. Fiktivt selskap, demo-nettside.
// ============================================================

export type ServiceCategory = 'utvendig' | 'innvendig' | 'lakk' | 'beskyttelse';

export const categories: { id: ServiceCategory; label: string; desc: string }[] = [
  {
    id: 'utvendig',
    label: 'Utvendig',
    desc: 'Vask, rens og vedlikehold av bilens ytre — for hånd, med riktige produkter.',
  },
  {
    id: 'innvendig',
    label: 'Innvendig',
    desc: 'Rens og behandling av kupeen — tekstil, skinn, plast og glass.',
  },
  {
    id: 'lakk',
    label: 'Lakk',
    desc: 'Rens, polering og korrigering — fra lett oppfriskning til dyp behandling.',
  },
  {
    id: 'beskyttelse',
    label: 'Beskyttelse',
    desc: 'Coating, forsegling og PPF-film som beskytter lakken over tid.',
  },
];

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  short: string; // én setning, brukes i oversikter
  description: string; // lengre, brukes på tjenestesiden
  includes: string[];
  suitedFor: string;
  priceFrom: string; // 'fra 1 190 kr'
  duration: string;
  booking: 'direct' | 'quote'; // direkte bestilling vs. prisoverslag
  sizeDependent: boolean;
  image: 'paint' | 'wash' | 'interior' | 'garage' | 'road' | 'wheel' | 'ppf' | 'foam' | 'pressure' | null;
};

export const site = {
  name: 'VANTA Auto Care',
  shortName: 'VANTA',
  domain: 'vantaauto.no',
  url: 'https://vantaauto.no',
  description:
    'Bilpleie, polering, keramisk coating og PPF i Oslo. Grundig arbeid, tydelige priser og enkel bestilling.',
  demoNotice:
    'VANTA Auto Care er et fiktivt selskap. Nettstedet er en design- og utviklingsdemo.',
  phone: { display: '+47 90 00 00 00', href: 'tel:+4790000000' },
  email: 'post@vantaauto.no',
  address: {
    street: 'Nydalsveien 24',
    postal: '0484 Oslo',
    city: 'Oslo',
    area: 'Nydalen',
  },
  geo: { lat: 59.9496, lng: 10.7662 },
  parking:
    'Parkering på egen tomt rett utenfor verkstedet. T-bane og buss til Nydalen stasjon.',
  hours: [
    { label: 'Mandag–fredag', value: '08.00–17.00' },
    { label: 'Lørdag', value: '10.00–14.00, etter avtale' },
    { label: 'Søndag', value: 'Stengt' },
  ],
  maps: {
    google:
      'https://www.google.com/maps/search/?api=1&query=Nydalsveien+24%2C+0484+Oslo',
    apple: 'https://maps.apple.com/?q=Nydalsveien%2024%2C%200484%20Oslo',
  },
  // ----------------------------------------------------------
  // Fremtidige integrasjoner (tomme sømmer — ingen backend i demo):
  // bookingProvider: null  → bytt ut bestillingsskjema med f.eks. Timma/Calendly
  // paymentProvider: null  → betaling legges til senere, aldri vist i demo
  // analytics: null        → legg til f.eks. Plausible/Umami her
  // emailService: null     → bekreftelses-epost ved bestilling
  // ----------------------------------------------------------
  integrations: {
    bookingProvider: null,
    paymentProvider: null,
    analytics: null,
    emailService: null,
  },
};

export const nav = [
  { href: '/tjenester', label: 'Tjenester' },
  { href: '/priser', label: 'Priser' },
  { href: '/prosjekter', label: 'Prosjekter' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/faq', label: 'FAQ' },
];

export const services: Service[] = [
  {
    slug: 'utvendig-bilpleie',
    category: 'utvendig',
    name: 'Utvendig bilpleie',
    short: 'Grundig utvendig vask med håndtørk og finish.',
    description:
      'Vask med aktivt skum, grundig felgrens, håndtørk og en lett forsegling som beskytter lakken mellom behandlingene. Passer når bilen trenger en ordentlig oppfriskning — ikke bare en runde i vaskehallen.',
    includes: [
      'Aktivt skum og håndvask',
      'Felgrens, inkludert innsiden av felgen',
      'Håndtørk med mikrofiber',
      'Lett lakforsegling',
      'Dørkarmer og hjulbrønner',
      'Rens av glass og speil',
    ],
    suitedFor:
      'Bilen som skal se ny ut igjen uten å bruke hele dagen. De fleste biler klarer seg med dette hver sjette til åttende uke.',
    priceFrom: 'fra 1 190 kr',
    duration: '2–3 timer',
    booking: 'direct',
    sizeDependent: true,
    image: 'wash',
  },
  {
    slug: 'innvendig-dyprens',
    category: 'innvendig',
    name: 'Innvendig dyprens',
    short: 'Støvsuging, rens av tekstil og skinn, og behandling av plast og lister.',
    description:
      'Hele kupeen tas lag for lag: støvsuging, rens av seter og tepper, behandling av skinn og plast, og glass innvendig. Bilen leveres klar til bruk.',
    includes: [
      'Støvsuging av hele kupeen',
      'Rens av seter og tepper',
      'Skinnrens og skinnpleie',
      'Plast og lister behandlet',
      'Glass innvendig',
      'Bagasjerom inkludert',
    ],
    suitedFor:
      'Leasingretur, bruktbilkjøp, eller når kupeen har samlet for mye gjennom en vinter.',
    priceFrom: 'fra 2 490 kr',
    duration: '4–6 timer',
    booking: 'direct',
    sizeDependent: true,
    image: 'interior',
  },
  {
    slug: 'full-bilpleie',
    category: 'utvendig',
    name: 'Full bilpleie',
    short: 'Utvendig og innvendig behandling i samme besøk.',
    description:
      'Alt fra utvendig bilpleie og innvendig dyprens i én samlet behandling. Det vanligste valget for bilen som skal leveres tilbake i god stand — eller tilbake til deg selv.',
    includes: [
      'Alt fra utvendig bilpleie',
      'Alt fra innvendig dyprens',
      'Lett forsegling av lakk',
      'Gjennomgang av bilen før levering',
    ],
    suitedFor:
      'Én behandling som setter hele bilen i orden, uten at du må koordinere to besøk.',
    priceFrom: 'fra 3 490 kr',
    duration: '5–7 timer',
    booking: 'direct',
    sizeDependent: true,
    image: null,
  },
  {
    slug: 'lakkrens-polering',
    category: 'lakk',
    name: 'Lakkrens og polering',
    short: 'Maskinpolering som fjerner oksidering og lette riper.',
    description:
      'Lakken renses med leire, deretter poleres den med maskin for å fjerne oksidering, kverner og lette riper. Resultatet er jevn glans og bedre dybde i lakken.',
    includes: [
      'Lakkrens med clay',
      'Maskinpolering i ett trinn',
      'Fjerning av oksidering',
      'Finish med forsegling',
    ],
    suitedFor:
      'Biler med slitt eller matt lakk som fortsatt har god lakktykkelse.',
    priceFrom: 'fra 4 900 kr',
    duration: '1–2 dager',
    booking: 'quote',
    sizeDependent: false,
    image: 'paint',
  },
  {
    slug: 'lakkorrigering',
    category: 'lakk',
    name: 'Lakkorrigering',
    short: 'Dyp korrigering for riper, kverner og hologrammer.',
    description:
      'Flertrinns korrigering der lakken måles og behandles i flere omganger. Fjerner dype riper og hologrammer, og forbereder lakken for coating eller forsegling.',
    includes: [
      'Måling av lakktykkelse',
      'Flertrinns maskinkorrigering',
      'Fjerning av hologrammer',
      'Forberedelse for coating',
    ],
    suitedFor:
      'Biler med synlige kverner og riper, eller som forberedelse før keramisk coating.',
    priceFrom: 'fra 8 900 kr',
    duration: '2–4 dager',
    booking: 'quote',
    sizeDependent: false,
    image: 'paint',
  },
  {
    slug: 'keramisk-coating',
    category: 'beskyttelse',
    name: 'Keramisk coating',
    short: 'Hard, hydrofob beskyttelse som varer i årevis.',
    description:
      'Lakken forberedes og påføres et keramisk lag som herder til en hard, vannavvisende overflate. Lettere å holde ren, bedre glans og beskyttelse mot miljø og svake riper.',
    includes: [
      'Lakkforberedelse',
      'Coating i 1–3 lag etter behov',
      'Herding i kontrollert miljø',
      'Vedlikeholdsveiledning',
    ],
    suitedFor:
      'Nyere biler der lakken fortsatt er god, og eiere som vil vaske sjeldnere og lettere.',
    priceFrom: 'fra 7 990 kr',
    duration: '2–4 dager',
    booking: 'quote',
    sizeDependent: false,
    image: 'garage',
  },
  {
    slug: 'lakforsegling',
    category: 'beskyttelse',
    name: 'Lakforsegling',
    short: 'Forsegling som forlenger effekten av vask og polering.',
    description:
      'En forsegling legges på ren lakk for å beskytte mellom behandlingene. Kan kombineres med utvendig bilpleie, eller legges i etterkant av polering.',
    includes: [
      'Rens av lakken',
      'Påføring av forsegling',
      'Håndavslutning',
    ],
    suitedFor:
      'Biler som vaskes jevnlig og skal ha ekstra beskyttelse uten full coating.',
    priceFrom: 'fra 1 690 kr',
    duration: '3–4 timer',
    booking: 'direct',
    sizeDependent: false,
    image: null,
  },
  {
    slug: 'felgrens',
    category: 'utvendig',
    name: 'Felgrens',
    short: 'Rens av felger og dekk, inkludert bremstøv og innsiden av felgen.',
    description:
      'Felgene løsnes ikke, men renses grundig med felgrens og børste — også innsiden og hjulbrønnene. Dekkene behandles for en jevn, sort finish.',
    includes: [
      'Felgrens med børste',
      'Innsiden av felgen',
      'Hjulbrønner',
      'Dekkbehandling',
    ],
    suitedFor:
      'Som egen behandling mellom vaskene, eller som tillegg til utvendig bilpleie.',
    priceFrom: 'fra 890 kr',
    duration: '1–2 timer',
    booking: 'direct',
    sizeDependent: true,
    image: null,
  },
  {
    slug: 'ppf',
    category: 'beskyttelse',
    name: 'PPF – lakkbeskyttelse',
    short: 'Selvhelbredende film som beskytter lakken mot steinsprut og riper.',
    description:
      'PPF (paint protection film) legges på utsatte områder eller hele bilen. Filmen er selvhelbredende, og dekkede flater trenger ikke poleres.',
    includes: [
      'Tilpasset kapping av film',
      'Delvis eller full innpakking',
      'Kanter og lister',
      'Vedlikeholdsveiledning',
    ],
    suitedFor:
      'Biler som kjører mye på E18 og E6, eller eiere som vil bevare lakken over tid.',
    priceFrom: 'fra 19 990 kr',
    duration: '3–7 dager',
    booking: 'quote',
    sizeDependent: false,
    image: 'road',
  },
];

export const sizeClasses = ['Mellomstor bil', 'Stor bil', 'SUV', 'Varebil'];

// Priser per størrelse (fiktive demopriser). Null = pris etter vurdering.
export const sizePrices: Record<string, (string | null)[]> = {
  'utvendig-bilpleie': ['1 190', '1 390', '1 590', '1 790'],
  'innvendig-dyprens': ['2 490', '2 790', '3 190', '3 490'],
  'full-bilpleie': ['3 490', '3 990', '4 490', '4 990'],
  felgrens: ['890', '990', '1 190', '1 390'],
};

export const priceDisclaimer =
  'Endelig pris avhenger av bilens størrelse, tilstand og ønsket behandling. Alle priser er fiktive eksempelpriser for denne demoen.';

export const process = [
  {
    step: '01',
    title: 'Send forespørsel',
    text: 'Fyll ut skjemaet med bil og ønsket behandling. Ta gjerne bilder av lakken — det hjelper oss.',
  },
  {
    step: '02',
    title: 'Vi vurderer bilen',
    text: 'For polering, coating og PPF ser vi alltid på bilen før vi lover noe. Det tar vanligvis én arbeidsdag.',
  },
  {
    step: '03',
    title: 'Du får pris og tidspunkt',
    text: 'Konkret pris og foreslått tidspunkt. Ingenting settes i gang før du har godkjent.',
  },
  {
    step: '04',
    title: 'Bilen leveres ferdig',
    text: 'Du henter en ferdig behandlet bil, og vi går gjennom resultatet sammen.',
  },
];

export const faqs = [
  {
    q: 'Hvor lang tid tar behandlingen?',
    a: 'Fra et par timer for utvendig bilpleie til flere dager for lakkorrigering og PPF. Du får alltid et konkret tidspunkt før vi setter i gang, og vi holder det.',
  },
  {
    q: 'Må bilen være tømt før innvendig rens?',
    a: 'Ja. Løse gjenstander, barneseter og personlige eiendeler må ut før behandlingen starter. Vi flytter ikke på tingene dine.',
  },
  {
    q: 'Kan dere ta imot elbil?',
    a: 'Ja. Elbiler behandles på samme måte som andre biler. Vi er forsiktige rundt høyspentkomponenter og følger bilens servicehåndbok.',
  },
  {
    q: 'Hva påvirker prisen?',
    a: 'Størrelsen på bilen, lakktilstanden og valget av behandling. Derfor oppgir vi startpriser — den endelige prisen avhenger av bilens størrelse, tilstand og ønsket behandling.',
  },
  {
    q: 'Hvordan fungerer coating?',
    a: 'Coating er et flytende lag som herder til en hard overflate. Den gjør lakken vannavvisende og lettere å holde ren, men den erstatter ikke vask.',
  },
  {
    q: 'Hvor lenge varer behandlingen?',
    a: 'Utvendig vask med forsegling: noen uker. Keramisk coating: flere år med riktig vedlikehold. PPF: i praksis bilens levetid.',
  },
  {
    q: 'Må jeg bestille på forhånd?',
    a: 'Ja, vi tar ikke inn drop-in. Du bestiller på nettet eller ringer, og får bekreftet tidspunkt. For polering, coating og PPF starter vi med en vurdering av bilen.',
  },
  {
    q: 'Hvor holder dere til?',
    a: 'Nydalsveien 24, 0484 Oslo — i Nydalen. Parkering på tomten rett utenfor, og det er gangavstand fra Nydalen T-banestasjon.',
  },
  {
    q: 'Kan jeg levere bilen på kveldstid?',
    a: 'Ja. Vi har nøkkelboks, og for de fleste behandlinger kan vi avtale levering på kveldstid eller i helgen.',
  },
  {
    q: 'Hvorfor krever dere vurdering før polering og coating?',
    a: 'Fordi prisen avhenger av lakktilstanden, ikke bare bilmodellen. En vurdering tar en arbeidsdag, og du får et konkret forslag før noe settes i gang.',
  },
];

export const demoPricingNote =
  'Alle priser på dette nettstedet er fiktive demopriser for en design-demo.';
