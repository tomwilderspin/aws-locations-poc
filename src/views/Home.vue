<template>
  <div class="">
    <img alt="Vue logo" src="../assets/earth-globe.svg" height="200">
    <app-title class="mt-4" />
    <address-lookup
      class="address-search"
      :address-results="addressSearchResults"
      @selectAddress="onAddressSelected"
      @searchTerm="onAddressChange"
    />
    <button
      v-if="address"
      class="btn btn-success btn-lg mt-3"
      @click="goToMapView"
    >
      <b>Show on map</b>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import AppTitle from '@/modules/AppTitle.vue';
import AddressLookup from '@/modules/addressLookup/AddressLookup.vue';

export default {
  name: 'Home',
  components: {
    AppTitle,
    AddressLookup,
  },
  computed: {
    ...mapState({
      addressSearchResults: (state) => state.addressResults,
      address: (state) => state.selectedAddress,
    }),
  },
  methods: {
    onAddressChange(searchTerm) {
      this.$store.dispatch('searchForAddress', searchTerm);
    },
    onAddressSelected(address) {
      this.$store.dispatch('setAddress', address);
    },
    goToMapView() {
      this.$router.push({ name: 'Map' });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-search {
  max-width: 450px;
  margin: auto;
}
</style>
