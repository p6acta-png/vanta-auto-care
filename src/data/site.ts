// ============================================================
// VANTA Auto Care — delt (språk-uavhengig) forretningsdata.
// Lokalisert innhold ligger i src/i18n/ (en.ts / no.ts).
// ============================================================

export const site = {
  name: 'VANTA Auto Care',
  shortName: 'VANTA',
  domain: 'vantaauto.no',
  url: 'https://vantaauto.no',
  phone: { display: '+47 90 00 00 00', href: 'tel:+4790000000' },
  email: 'post@vantaauto.no',
  address: {
    street: 'Nydalsveien 24',
    postal: '0484 Oslo',
    city: 'Oslo',
    area: 'Nydalen',
  },
  geo: { lat: 59.9496, lng: 10.7662 },
  maps: {
    google:
      'https://www.google.com/maps/search/?api=1&query=Nydalsveien+24%2C+0484+Oslo',
    apple: 'https://maps.apple.com/?q=Nydalsveien%2024%2C%200484%20Oslo',
  },
  // Fremtidige integrasjoner (tomme sømmer — ingen backend i demo):
  integrations: {
    bookingProvider: null,
    paymentProvider: null,
    analytics: null,
    emailService: null,
  },
};

// Eksempelpriser per bilstørrelse (fiktive demopriser), nøkler = service-slug
export const sizePrices: Record<string, (string | null)[]> = {
  'exterior-care': ['1 190', '1 390', '1 590', '1 790'],
  'interior-deep-clean': ['2 490', '2 790', '3 190', '3 490'],
  'full-detail': ['3 490', '3 990', '4 490', '4 990'],
  'wheel-care': ['890', '990', '1 190', '1 390'],
};
