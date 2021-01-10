import Vue from 'vue';
import Vuex from 'vuex';
import AuthProvider, { AUTH_PROVIDERS } from '@/modules/auth/AuthProvider';
import AddressLookupProvider, { PLACE_PROVIDERS } from '@/modules/addressLookup/AddressLookupProvider';

Vue.use(Vuex);
const authProvider = new AuthProvider(AUTH_PROVIDERS.COGNITO);
const addressLookupProvider = new AddressLookupProvider(
  PLACE_PROVIDERS.AWS,
  authProvider.providerCredentials,
);

export default new Vuex.Store({
  state: {
    addressResults: [],
    selectedAddress: null,
    authCreds: authProvider.providerCredentials,
  },
  mutations: {
    SET_ADDRESS(state, address) {
      state.selectedAddress = address;
    },
    SET_ADDRESS_RESULTS(state, addressResults) {
      state.addressResults = addressResults;
    },
  },
  actions: {
    async searchForAddress(context, searchTerm) {
      const searchResults = await addressLookupProvider.client.searchForAddress(searchTerm)
        .catch((error) => {
          console.log('address search error', error);
          return [];
        });
      context.commit('SET_ADDRESS_RESULTS', searchResults);
    },
    setAddress(context, address) {
      context.commit('SET_ADDRESS', address);
    },
  },
  modules: {
  },
});
