<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <StatisticsCardsCategory ref="StatisticsCardsCategory"></StatisticsCardsCategory>
        <searchComponent @search="handlesearch"></searchComponent>
        <div class="flex justify-end my-3">
            <Button @click="handleModelCreateCategory" :icon="`<i class= 'bx bx-add-to-queue' > </i>`"
                :text="'Thêm danh mục mới'"></Button>
        </div>

        <listCategories ref="listCategories" @handleStatus="loadCardsCategory"></listCategories>
        <ImportAndExportForCategoryComponent @load="loadCategories"></ImportAndExportForCategoryComponent>
        <chartCategories></chartCategories>
    </div>
    <newCategory :isOpen="modalAddNewIsOpen" @create-success="loadCategories" @close="handleModelCreateCategory">
    </newCategory>

</template>

<script>
import listCategories from '@/components/categories/listCategories.vue';
import searchComponent from '@/components/search/searchComponent.vue';
import Button from '@/components/buttons/button.vue';
import newCategory from '@/components/categories/newCategory.vue';
import StatisticsCardsCategory from '@/components/categories/StatisticsCardsCategory.vue';
import chartCategories from '@/components/categories/chartCategories.vue';
import ImportAndExportForCategoryComponent from '@/components/categories/ImportAndExportForCategoryComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'categoriesView',
    data() {
        return {
            modalAddNewIsOpen: false,
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Quản lý danh mục', name: '' },
            ]
        }
    },

    components: {
        listCategories,
        Button,
        newCategory,
        StatisticsCardsCategory,
        chartCategories,
        ImportAndExportForCategoryComponent,
        BreadcrumbComponent,
        searchComponent

    },
    methods: {
        handleModelCreateCategory() {
            this.modalAddNewIsOpen = !this.modalAddNewIsOpen;
        },
        async loadCategories() {
            await this.$refs.listCategories.handlesListCategories();
        },
        async loadCardsCategory() {
            await this.$refs.StatisticsCardsCategory.getArr();
        },
        async handlesearch(key) {
            await this.$refs.listCategories.handlesListCategories(key);
        }

    }

}
</script>

<style></style>