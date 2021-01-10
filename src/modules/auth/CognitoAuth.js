import AWS from 'aws-sdk';

const IDENTITY_POOL_ID = process.env.VUE_APP_AWS_IDENTITY_POOL;
const REGION = process.env.VUE_APP_AWS_REGION;
export default class {
  credentials;

  constructor() {
    AWS.config.region = REGION;
    this.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
    });
  }
}
