<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <orderPartnerComponent></orderPartnerComponent>
    </div>
</template>

<script>
import orderPartnerComponent from '@/components/order/orderPartnerComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'orderPartner',
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Đơn hàng đối tác', name: '' },
            ],
        }
    },
    components: {
        orderPartnerComponent,
        BreadcrumbComponent
    }

}
</script>

<style></style>