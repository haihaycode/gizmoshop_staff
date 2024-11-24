<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <StatisticsCardsVoucher ref="StatisticsCardsVoucher"></StatisticsCardsVoucher>

        <!-- search -->
        <SearchVoucherComponent @search="handleSearch"></SearchVoucherComponent>
        <!-- btn add New  -->
        <div class="flex justify-end">
            <Button :color="'bg-[#0e0b36]'" :text="'Thêm Phiếu Giảm Giá Mới'"
                :icon="`<i class= 'bx bx-add-to-queue' > </i>`" class="mb-2 "
                @click="handleChangeStatusModalAddNew"></Button>
        </div>

        <!-- list  -->
        <ListVoucherComponent @succes="handleRefsRefeshLoadVoucherCard" :codeProp="code" :statusProp="status"
            ref="ListVoucherComponent"></ListVoucherComponent>
        <ImportAndExportFromExcelComponent></ImportAndExportFromExcelComponent>

    </div>

    <!-- component Add new -->
    <NewVoucherComponent :isOpen="modalAddNewVoucherisOpen" @close="handleChangeStatusModalAddNew"
        @create-success="handleRefsRefeshVoucher">
    </NewVoucherComponent>

</template>

<script>
import ListVoucherComponent from '@/components/voucher/ListVoucherComponent.vue';
import NewVoucherComponent from '@/components/voucher/NewVoucherComponent.vue';
import SearchVoucherComponent from '@/components/voucher/SearchVoucherComponent.vue';
import ImportAndExportFromExcelComponent from '@/components/fileTransfer/ImportAndExportFromExcelComponent.vue';
import BreadcrumbComponent from '@/components/breadcrumb/BreadcrumbComponent.vue';
import StatisticsCardsVoucher from '@/components/voucher/StatisticsCardsVoucher.vue';
import Button from '@/components/buttons/button.vue';
export default {
    name: `VoucherViewComponent`,
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Quản lý phiếu giảm giá', name: '' },
            ],
            modalAddNewVoucherisOpen: false,
            code: '',
            status: ''
        }
    },
    components: {
        ListVoucherComponent,
        NewVoucherComponent,
        SearchVoucherComponent,
        BreadcrumbComponent,
        Button,
        ImportAndExportFromExcelComponent,
        StatisticsCardsVoucher
    },
    methods: {
        handleRefsRefeshLoadVoucherCard() {
            this.$refs.StatisticsCardsVoucher.getArr();
        },
        handleChangeStatusModalAddNew() {
            this.modalAddNewVoucherisOpen = !this.modalAddNewVoucherisOpen;
        },
        handleRefsRefeshVoucher() {
            this.$refs.ListVoucherComponent.handlegetVouchers();
        },
        handleSearch(searchParams) {
            this.code = searchParams.code;
            this.status = searchParams.status;
        }
    }
}
</script>

<style></style>