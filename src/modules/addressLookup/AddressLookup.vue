<template>
  <form @submit.prevent>
    <div class="input-group mt-3">
      <input
        v-model="searchTerm"
        type="text"
        list="address-results"
        class="form-control"
        placeholder="Search for your Address"
        aria-label="Type to search for address"
        aria-describedby="search-btn"
      >
      <button class="btn btn-success text-white" id="search-btn" @click="onSearch">
        <i class="fas fa-search me-2"></i>
        <b>Search</b>
      </button>
    </div>
    <select
      v-if="dataList.length"
      v-model="selectedAddress"
      class="form-select mt-3"
      aria-label="Address select"
    >
      <option selected disabled :value="null">Select your Address</option>
      <option v-for="(item, index) in dataList" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </form>
</template>

<script>
export default {
  name: 'AddressLookup',
  props: {
    addressResults: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      searchTerm: '',
      selectedAddress: null,
    };
  },
  watch: {
    selectedAddress(val) {
      if (val !== null) {
        this.$emit('selectAddress', val);
      }
    },
  },
  computed: {
    dataList() {
      const dataList = this.addressResults.map((result) => ({
        label: result.addressText,
        value: result,
      }));
      return dataList;
    },
  },
  methods: {
    onSearch() {
      this.$emit('searchTerm', this.searchTerm);
    },
  },
};
</script>
