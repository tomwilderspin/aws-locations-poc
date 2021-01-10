export default class {
  countryCode;

  geoPoints;

  addressText;

  postcode;

  region;

  streetName;

  county;

  town;

  addressNumber;

  constructor(place) {
    const map = {
      Country: 'countryCode',
      AddressNumber: 'addressNumber',
      Geometry: 'geoPoints',
      Label: 'addressText',
      Municipality: 'town',
      PostalCode: 'postcode',
      Region: 'region',
      Street: 'streetName',
      SubRegion: 'county',
    };
    Object.entries(place).forEach((field) => {
      const [key, value] = field;
      if (map[key]) {
        this[map[key]] = value;
      }
    });
  }
}
