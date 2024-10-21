<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
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
