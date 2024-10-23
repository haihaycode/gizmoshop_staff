<template>
  <div
    class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0"
  >
    <SearchBrandCompoment @search="handleSearch"></SearchBrandCompoment>
    <div class="flex justify-end">
      <Button
        @click="handleModelCreate"
        :text="'Thêm Thương Hiệu Mới'"
        :icon="`<i class='bx bx-add-to-queue'></i>`"
        class="mb-2"
      ></Button>
    </div>

    <!-- Danh sách thương hiệu -->
    <ListBrand :nameProp="name" :deletedProp="deleted" ref="ListBrandComponent"></ListBrand>

    <!-- Component Thêm thương hiệu mới -->
    <NewBrandComponent
      :isOpen="modalAddNewIsOpen"
      @close="handleModelCreate"
      @create-success="refreshBrandList"
    ></NewBrandComponent>
  </div>
</template>

<script>
import ListBrand from "@/components/brand/ListBrand.vue";
import Button from "@/components/buttons/button.vue";
import NewBrandComponent from "@/components/brand/NewBrandComponent.vue";
import SearchBrandCompoment from "@/components/brand/SearchBrandCompoment.vue";

export default {
  name: "brandView",
  data() {
    return {
      modalAddNewIsOpen: false,
      name: "",
      deleted: "",
    };
  },
  components: {
    ListBrand,
    Button,
    NewBrandComponent,
    SearchBrandCompoment,
  },
  methods: {
    handleModelCreate() {
      this.modalAddNewIsOpen = !this.modalAddNewIsOpen;
    },
    closeModal() {
      this.modalAddNewIsOpen = false;
    },
    refreshBrandList() {
      this.$refs.ListBrandComponent.handleGetBrand();
    },
    handleSearch(searchParams) {
      console.log("Received Search Params in brandView:", searchParams);
      this.name = searchParams.name;
      this.deleted = searchParams.deleted;
    },
  },
};
</script>

<style scoped></style>
