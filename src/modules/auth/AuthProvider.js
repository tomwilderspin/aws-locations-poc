import CognitoAuth from './CognitoAuth';

export const AUTH_PROVIDERS = {
  COGNITO: 'cognito',
};

export default class {
  provider;

  constructor(provider) {
    if (provider === AUTH_PROVIDERS.COGNITO) {
      this.provider = new CognitoAuth();
    } else {
      throw new Error(`requires auth provider: ${Object.values(AUTH_PROVIDERS).join(', ')}`);
    }
  }

  get providerCredentials() {
    return this.provider.credentials;
  }
}
