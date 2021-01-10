<template>
  <div class="w-100 h-100">
    <amazon-mapbox-map
      :credentials="mapCreds"
      :region="region"
      :mapName="mapName"
      :startCenterGeo="startGeo"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AmazonMapboxMap from '@/modules/map/AmazonMapboxMap.vue';

const AWS_MAP_NAME = process.env.VUE_APP_AWS_MAP_NAME;

export default {
  name: 'Map',
  components: {
    AmazonMapboxMap,
  },
  data() {
    return {
      region: 'eu-west-1',
      mapName: AWS_MAP_NAME,
    };
  },
  computed: {
    ...mapState({
      startGeo: (state) => {
        if (state.selectedAddress !== null) {
          return state.selectedAddress.geoPoints;
        }
        return { Point: [48.816517, 2.278388] };
      },
      mapCreds: (state) => state.authCreds,
    }),
  },
};
</script>
