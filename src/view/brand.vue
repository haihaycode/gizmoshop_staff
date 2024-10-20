<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="p-2 bg-gray-200 bg-opacity-30 flex flex-col lg:flex-row lg:items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0 lg:m-2 md:m-0"
  >
    <ListBrand> </ListBrand>
  </div>
</template>

<script>
import ListBrand from "@/components/brand/ListBrand.vue";

export default {
  name: 'brandView',
  components: {
    ListBrand,
  },
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
