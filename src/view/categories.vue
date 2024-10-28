<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <StatisticsCardsCategory ref="StatisticsCardsCategory"></StatisticsCardsCategory>

        <div class="flex justify-end mt-3">
            <Button @click="handleModelCreateCategory" :icon="`<i class= 'bx bx-add-to-queue' > </i>`"
                :text="'Thêm danh mục mới'"></Button>
        </div>
        <listCategories ref="listCategories" @handleStatus="loadCardsCategory"></listCategories>
        <chartCategories></chartCategories>
    </div>
    <newCategory :isOpen="modalAddNewIsOpen" @create-success="loadCategories" @close="handleModelCreateCategory">
    </newCategory>

</template>

<script>
import listCategories from '@/components/categories/listCategories.vue';
import Button from '@/components/buttons/button.vue';
import newCategory from '@/components/categories/newCategory.vue';
import StatisticsCardsCategory from '@/components/categories/StatisticsCardsCategory.vue';
import chartCategories from '@/components/categories/chartCategories.vue';
export default {
    name: 'categoriesView',
    data() {
        return {
            modalAddNewIsOpen: false,
        }
    },

    components: {
        listCategories,
        Button,
        newCategory,
        StatisticsCardsCategory,
        chartCategories
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
        }

    }

}
</script>

<style></style>