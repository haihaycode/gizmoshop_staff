<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <div class="flex justify-end">
            <Button @click="handleModelCreateCategory" :icon="`<i class= 'bx bx-add-to-queue' > </i>`"
                :text="'Thêm danh mục mới'"></Button>
        </div>
        <listCategories ref="listCategories"></listCategories>
    </div>
    <newCategory :isOpen="modalAddNewIsOpen" @create-success="loadCategories" @close="handleModelCreateCategory">
    </newCategory>
</template>

<script>
import listCategories from '@/components/categories/listCategories.vue';
import Button from '@/components/buttons/button.vue';
import newCategory from '@/components/categories/newCategory.vue';

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
        newCategory
    },
    methods: {
        handleModelCreateCategory() {
            this.modalAddNewIsOpen = !this.modalAddNewIsOpen;
        },
        async loadCategories() {
            await this.$refs.listCategories.handlesListCategories();
        }

    }

}
</script>

<style></style>