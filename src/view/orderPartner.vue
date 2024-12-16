<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <orderPartnerComponent ref="orderPartnerComponent"></orderPartnerComponent>
    </div>
</template>

<script>
import orderPartnerComponent from '@/components/order/orderSupplierComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'orderPartner',
    data() {
        return {
            searchCode: '',
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Đơn hàng đối tác', name: '' },
            ],
        }
    },
    mounted() {
        this.searchCode = this.$route.params.codeOrder;
        console.log(this.searchCode);
        this.searchOrder();
    },
    components: {
        orderPartnerComponent,
        BreadcrumbComponent
    },
    methods: {
        async searchOrder() {
            try {
                if (this.searchCode) {
                    await this.$refs.orderPartnerComponent.getListAll(this.searchCode);
                }
            } catch (error) {
                console.error("Lỗi khi tìm kiếm đơn hàng:", error);
            }
        }
    },
    watch: {
        '$route.params.codeOrder': function (newCode, oldCode) {
            if (newCode !== oldCode) {
                this.searchCode = newCode;
                this.searchOrder();
            }
        }
    }

}
</script>

<style></style>