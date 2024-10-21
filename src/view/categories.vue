<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <div class="flex justify-end">
            <Button @click="handleModelCreateCategory" :text="'Thêm danh mục mới'"></Button>
        </div>
        <listCategories ref="listCategories"></listCategories>
    </div>
    <createCategory :isOpen="modalAddNewIsOpen" @create-success="loadCategories" @close="handleModelCreateCategory">
    </createCategory>
</template>

<script>
import listCategories from '@/components/categories/listCategories.vue';
import Button from '@/components/buttons/button.vue';
import createCategory from '@/components/categories/createCategory.vue';

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
        createCategory
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