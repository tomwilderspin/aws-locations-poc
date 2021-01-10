<template>
  <div :id="mapId" class="w-100 h-100"></div>
</template>

<script>
// mapBox css styles.
import 'mapbox-gl/dist/mapbox-gl.css';
import AmazonMapboxProvider from './AmazonMapBoxProvider';

export default {
  name: 'AmazonMapboxMap',
  props: {
    region: {
      type: String,
      required: false,
      default: 'eu-west-1',
    },
    credentials: {
      type: Object,
      required: true,
    },
    mapName: {
      type: String,
      required: true,
    },
    startZoom: {
      type: Number,
      required: false,
      default: 14,
    },
    startCenterGeo: {
      type: Object,
      required: false,
      default: () => ({ Point: [2.278388, 48.816517] }),
    },

  },
  data() {
    return {
      mapId: `mapbox-map-${Date.now()}`,
      zoom: this.startZoom,
      centerGeo: this.startCenterGeo,
      mapProvider: null,
    };
  },
  created() {
    this.mapProvider = new AmazonMapboxProvider(this.mapName, this.region, this.credentials);
  },
  mounted() {
    if (this.mapProvider === null) {
      console.error(new Error('Failed to init new error'));
      return;
    }
    this.mapProvider.initMap({
      uiContainerId: this.mapId,
      zoom: this.zoom,
      centerGeo: this.centerGeo,
    });
  },
};
</script>
