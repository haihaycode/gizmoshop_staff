<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <SearchProductCompoment @search="handlesearch"></SearchProductCompoment>
        <div class="flex justify-end">
            <Button @click="goToAddProduct" :text="'Thêm Sản phẩm'" :icon="`<i class='bx bx-add-to-queue'></i>`"
                class="mb-2"></Button>
        </div>

        <listProductComponent :queryParams="queryParams" ref="listProductComponent"></listProductComponent>
    </div>
</template>

<script>
import listProductComponent from '@/components/product/listProductComponent.vue';
import Button from '@/components/buttons/button.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
import SearchProductCompoment from '@/components/product/SearchProductCompoment.vue';
export default {
    name: "productView",
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Quản lý sản phẩm', name: '' },
            ],
            queryParams: {
                name: "",
                isSupplier: null,
            },
        }
    },
    components: {
        BreadcrumbComponent,
        listProductComponent,
        Button,
        SearchProductCompoment
    }, methods: {
        goToAddProduct() {
            this.$router.push({ name: 'add-product' });
        },
        async handlesearch(queryParams) {
            // await this.$refs.listProductComponent.getDataProduct();
            this.queryParams = queryParams.queryParams
        }
    }


}
</script>

<style></style>