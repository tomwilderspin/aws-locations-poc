import { Signer } from '@aws-amplify/core';
import Mapboxgl from 'mapbox-gl';

export default class {
  mapName;

  credentials;

  region;

  credsRefreshTimer;

  map;

  constructor(mapName, region, credentials) {
    this.mapName = mapName;
    this.credentials = credentials;
    this.region = region;
  }

  async refreshCreds() {
    // creds are only valid till the expire time (an hour), this refreshes them.
    await this.credentials.refreshPromise();
    this.credsRefreshTimer = setTimeout(
      this.refreshCreds,
      this.credentials.expireTime - new Date(),
    );
  }

  transformMapboxRequest = (url, resourceType) => {
    let forwardUrl = url;
    if (resourceType === 'Style' && url.includes('://') === false) {
      // forward to aws.
      forwardUrl = `https://maps.geo.${this.region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
    }
    if (forwardUrl.includes('amazonaws.com') === true) {
      // sigV4 sign aws url with creds.
      forwardUrl = Signer.signUrl(forwardUrl, {
        access_key: this.credentials.accessKeyId,
        secret_key: this.credentials.secretAccessKey,
        session_token: this.credentials.sessionToken,
      });
    }

    return { url: forwardUrl };
  }

  async initMap(params = {}) {
    const { uiContainerId = '', centerGeo = { Point: [48.816517, 2.278388] }, zoom = 10 } = params;
    await this.credentials.refreshPromise();
    const [lng, lat] = centerGeo.Point;
    this.map = new Mapboxgl.Map({
      container: uiContainerId,
      center: [lng, lat],
      zoom,
      style: this.mapName,
      transformRequest: this.transformMapboxRequest,
    });
    this.map.addControl(new Mapboxgl.NavigationControl(), 'top-left');
  }
}
