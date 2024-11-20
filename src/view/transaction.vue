<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <findStatusTransactionComponent @search="handleKeySearch"></findStatusTransactionComponent>
        <transactionComponent :queryParams="dataSearch"></transactionComponent>

    </div>
</template>

<script>
import findStatusTransactionComponent from '@/components/transaction/findStatusTransactionComponent.vue';
import transactionComponent from '@/components/transaction/transactionComponent.vue';
export default {
    name: 'transactionView',
    data() {
        return {
            dataSearch: {
                auth: '',
                status: ''
            }
        }
    },
    components: {
        transactionComponent,
        findStatusTransactionComponent
    },
    methods: {
        handleKeySearch(data) {
            this.dataSearch = data
        }

    }

}
</script>

<style></style>