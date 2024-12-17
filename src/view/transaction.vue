<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <findStatusTransactionComponent @search="handleKeySearch"></findStatusTransactionComponent>
        <transactionComponent ref="transactionComponent" :queryParams="dataSearch"></transactionComponent>

    </div>
</template>

<script>
import findStatusTransactionComponent from '@/components/transaction/findStatusTransactionComponent.vue';
import transactionComponent from '@/components/transaction/transactionComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
export default {
    name: 'transactionView',
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Danh sách giao dịch', name: '' },
            ],
            dataSearch: {
                auth: '',
                status: ''
            },
            idTransaction: '',
        }
    },
    components: {
        transactionComponent,
        findStatusTransactionComponent,
        BreadcrumbComponent
    },
    methods: {
        handleKeySearch(data) {
            this.dataSearch = data
        },
        emitSearch() {
        this.$refs.transactionComponent.getlist(this.idTransaction);
        }
    },
    watch: {
        '$route.params.idTransaction': function (newCode, oldCode) {
            if (newCode !== oldCode) {
                this.idTransaction = newCode;
                this.emitSearch();
            }
        }
    }

}
</script>

<style></style>