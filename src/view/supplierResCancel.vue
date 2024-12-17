<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5  lg:m-2 md:m-0">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <supplierResSupplier></supplierResSupplier>
    </div>
</template>

<script>
import supplierResSupplier from '@/components/supplier/supplierResSupplier.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'supplierResCancelView',
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Danh sách Các Nhà Cung Cấp Yêu Cầu Hủy', name: '' },
            ],
        }
    },
 
    components: {
        BreadcrumbComponent,
        supplierResSupplier
    }

}
</script>

<style></style>