<template>
  <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
    <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>

    <StatisticsCardsBrand ref="StatisticsCardsBrand"></StatisticsCardsBrand>

    <SearchBrandCompoment @search="handleSearch"></SearchBrandCompoment>
    <div class="flex justify-end">
      <Button @click="handleModelCreate" :text="'Thêm Thương Hiệu Mới'" :icon="`<i class='bx bx-add-to-queue'></i>`"
        class="mb-2"></Button>
    </div>

    <!-- Danh sách thương hiệu -->
    <ListBrand @handleStatus="loadCardsBrand" :nameProp="name" :deletedProp="deleted" ref="ListBrandComponent">
    </ListBrand>


    <ListBrand :nameProp="name" :deletedProp="deleted" ref="ListBrandComponent"></ListBrand>
    <!-- component import and Export all For Brand  -->
    <ImportAndExportForBrandComponent></ImportAndExportForBrandComponent>
    <!-- Component Thêm thương hiệu mới -->
    <NewBrandComponent :isOpen="modalAddNewIsOpen" @close="handleModelCreate" @create-success="refreshBrandList">
    </NewBrandComponent>

    <ChartBrandProductComponent></ChartBrandProductComponent>


  </div>
</template>

<script>
import ListBrand from "@/components/brand/ListBrand.vue";
import StatisticsCardsBrand from "@/components/brand/StatisticsCardsBrand.vue";
import Button from "@/components/buttons/button.vue";
import NewBrandComponent from "@/components/brand/NewBrandComponent.vue";
import SearchBrandCompoment from "@/components/brand/SearchBrandCompoment.vue";
import ChartBrandProductComponent from "@/components/brand/ChartBrandProductComponent.vue";
import ImportAndExportForBrandComponent from "@/components/brand/ImportAndExportForBrandComponent.vue";
import BreadcrumbComponent from "@/components/breadcrumb/BreadcrumbComponent.vue";
export default {
  name: "brandView",
  data() {
    return {
      breadcrumbItems: [
        { text: 'Trang chủ', name: 'dashboard' },
        { text: 'Quản lý thương hiệu', name: '' },
      ],
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
    ChartBrandProductComponent,
    ImportAndExportForBrandComponent,
    BreadcrumbComponent,
    StatisticsCardsBrand
  },
  methods: {

    async loadCardsBrand() {
      await this.$refs.StatisticsCardsBrand.getArr();
    },
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
      this.name = searchParams.name;
      this.deleted = searchParams.deleted;
    },
  },
};
</script>

<style scoped></style>
