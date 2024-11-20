<template>
    <div>
        <TableComponent :items="listdata" :loading="isLoading">
            <template #header>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">STT</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">TÊN KHÁCH HÀNG
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">SỐ TIỀN RÚT
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">GHI CHÚ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">TRẠNG THÁI
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">THỜI GIAN</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">CẬP NHẬT GIAO
                    DỊCH</th>
            </template>
            <template #body>
                <tr @click="handleUpdateModal(item)" v-for:="(item, index) in listdata" :key="index"
                    class="hover:bg-gray-300">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ item.account?.fullname
                        }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatCurrencyVN
                        (item.amount) }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.note }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        translateStatus(item.status) }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        formatDay(item.withdrawalDate) }} </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 "><i
                            class='bx bxs-edit text-2xl'></i>
                    </td>
                </tr>
            </template>
            <template #footer>
                <div class="col-span-7"></div>
            </template>
            <template #pagination>
                <div>
                    <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="limit"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>
        <updateTransactionComponent @update-succes="getlist" :slected-transaction="slectedTransaction"
            :isOpen="isOpenModalUpdata" @close="isOpenModalUpdata = false">
        </updateTransactionComponent>
    </div>
</template>

<script>
import updateTransactionComponent from './updateTransactionComponent.vue';
import Pagination from '../pagination/Pagination.vue';
import TableComponent from '../table/TableComponent.vue';
import { mapGetters } from 'vuex';
import { getAllTransaction } from '@/api/withdrawalApi'
import { formatDay, formatCurrencyVN } from '@/utils/currencyUtils'
export default {
    name: "transactionComponent",
    data() {
        return {
            slectedTransaction: null,
            isOpenModalUpdata: false,
            auth: "CUSTOMER",
            status: "PENDING",
            pagination: null,
            listdata: [],
            page: 0,
            limit: 5,
            sortField: "id",
            sortDirection: "desc",
        }
    },
    components: {
        TableComponent,
        Pagination,
        updateTransactionComponent
    },
    computed: {
        ...mapGetters("loading", ['isLoading']),
    },
    mounted() {
        this.getlist()
    },
    props: {
        queryParams: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        formatDay, formatCurrencyVN,
        async getlist() {
            try {
                const data = {
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                    auth: this.auth,
                    status: this.status
                }
                const res = await getAllTransaction(data)
                this.pagination = res.data
                this.listdata = res.data.content
            } catch (error) {
                console.error(error)
            }
        },
        translateStatus(status) {
            switch (status) {
                case "COMPETED":
                    return "Hoàn tất";
                case "PENDING":
                    return "Đang chờ duyệt";
                case "CANCEL":
                    return "Hủy bỏ";
                default:
                    return "Không xác định";
            }
        },
        handleUpdateModal(item) {
            this.slectedTransaction = item
            this.isOpenModalUpdata = !this.isOpenModalUpdata
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getlist();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.getlist();
        },
    },
    watch: {
        queryParams(newCode) {
            console.log('New Code:', newCode);
            this.auth = newCode.auth;
            this.status = newCode.status;
            this.getlist();
        },
    },
}
</script>

<style></style>