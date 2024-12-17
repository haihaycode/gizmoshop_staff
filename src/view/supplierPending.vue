<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <supplierPendingComponent></supplierPendingComponent>
    </div>
</template>

<script>
import supplierPendingComponent from '../components/supplier/supplierPendingComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'SupplierPending',
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Danh sách Các Nhà Cung Cấp Chờ Chấp Nhận', name: '' },
            ],
        }
    },
    components: {
        supplierPendingComponent,
        BreadcrumbComponent
    }

}
</script>

<style></style>