<template>
  <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
    <!-- Nút thêm thương hiệu mới -->
    <div class="flex justify-end">
      <Button
        @click="handleModelCreate"
        :text="'Thêm Thương Hiệu Mới'"
        :icon="`<i class='bx bx-add-to-queue'></i>`"
        class="mb-2"
      ></Button>
    </div>

    <!-- Danh sách thương hiệu -->
    <ListBrand ref="ListBrandComponent"></ListBrand>

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

export default {
  name: "brandView",
  data() {
    return {
      modalAddNewIsOpen: false, // Trạng thái mở modal
    };
  },
  components: {
    ListBrand,
    Button,
    NewBrandComponent,
  },
  methods: {
    // Mở hoặc đóng modal tạo thương hiệu mới
    handleModelCreate() {
      this.modalAddNewIsOpen = !this.modalAddNewIsOpen;
    },

    // Đóng modal khi thao tác thành công
    closeModal() {
      this.modalAddNewIsOpen = false;
    },

    // Refresh danh sách thương hiệu sau khi thêm thành công
    refreshBrandList() {
      this.$refs.ListBrandComponent.handleGetBrand(); // Gọi phương thức để refresh danh sách
    },
  },
};
</script>

<style scoped></style>
