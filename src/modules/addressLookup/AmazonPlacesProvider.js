import Location from 'aws-sdk/clients/location';
import AmazonAddressModel from './AmazonAddressModel';

const REGION = process.env.VUE_APP_AWS_REGION;
const PLACE_INDEX = process.env.VUE_APP_PLACE_INDEX;

export default class {
  client;

  constructor(credentials) {
    this.client = new Location({
      credentials,
      region: REGION,
    });
  }

  searchForAddress(searchTerm) {
    const params = {
      IndexName: PLACE_INDEX,
      Text: searchTerm,
    };
    return this.client.searchPlaceIndexForText(params).promise()
      .then((query) => {
        const { Results: results = [] } = query;
        return results.map((result) => new AmazonAddressModel(result.Place));
      });
  }
}
