<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <listSupplierComponent ref="listSupplierComponent"></listSupplierComponent>
        
    </div>
</template>

<script>
import listSupplierComponent from '../components/supplier/listSupplierComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';

export default {
    name: 'ListSupplier',

    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Danh sách Các Nhà Cung Cấp', name: '' },
            ],
        }
    },
    components: {
        listSupplierComponent,
        BreadcrumbComponent
    },
}
</script>

<style></style>