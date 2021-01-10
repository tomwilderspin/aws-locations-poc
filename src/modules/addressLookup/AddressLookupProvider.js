import AmazonPlacesProvider from './AmazonPlacesProvider';

export const PLACE_PROVIDERS = {
  AWS: 'aws',
};
export default class {
  provider;

  constructor(provider, credentials) {
    if (provider === PLACE_PROVIDERS.AWS) {
      this.provider = new AmazonPlacesProvider(credentials);
    } else {
      throw new Error(`requires a provider ${Object.keys(PLACE_PROVIDERS).join(', ')}`);
    }
  }

  get client() {
    return this.provider;
  }
}
