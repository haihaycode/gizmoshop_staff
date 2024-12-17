<template>
  <div class="mb-4 ">
    <label for="search" class="block   text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
    <div class="flex">
      <input type="text" v-model="searchQuery" placeholder="Nhập từ khóa để tìm kiếm..."
        class="mr-2 flex-1 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      <Button @click="performSearch"  :text="'Tìm kiếm'"></Button>
    </div>

  </div>
</template>

<script>
import Button from '../buttons/button.vue';
// import { mapGetters } from 'vuex';
export default {
  name: 'searchComponent',
  data() {
    return {
      searchQuery: '',
    };
  },
  // computed: {
  //   ...mapGetters('loading', ['isLoading'])
  // },
  components: {
    Button
  },
  methods: {

    performSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped></style>