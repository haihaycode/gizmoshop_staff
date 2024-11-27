<template>
    <div>
        <TableComponent :items="listOrder" :loading="isLoading">
            <template #header>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    STT <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TÊN NHÀ CUNG CẤP <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('totalPrice')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TỔNG TIỀN <span v-html="getSortIcon('totalPrice')"></span>
                </th>
                <th @click="changeSort('vouchers')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    SỐ LƯỢNG MẶT HÀNG CUNG CẤP <span v-html="getSortIcon('vouchers')"></span>
                </th>
                <th @click="changeSort('createOderTime')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    NGÀY TẠO <span v-html="getSortIcon('createOderTime')"></span>
                </th>
                <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TRẠNG THÁI <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    CHI TIẾT HỢP ĐỒNG <span v-html="getSortIcon('id')"></span>
                </th>
            </template>
            <template #body>
                <tr @click="isOpenModalDetail(item)" v-for="(item, index) in listOrder" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.account.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ formatCurrencyVN(item.totalPrice) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.orderDetails.length }}
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ formatDay(item.createOderTime) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <select @click.stop v-model="item.orderStatus.id"
                            class="border w-40 border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option v-for="statusItem in statusOrder" :key="statusItem.id" :value="statusItem.id">
                                {{ statusItem.status }}
                            </option>
                        </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.note }}
                    </td>
                </tr>
            </template>
            <template #footer>
                <td colspan="7"></td>
            </template>
            <template #pagination>
                <div>
                    <Pagination :total-items="pagination?.totalElements || 1" :items-per-page="limit"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>
    </div>
    <orderSupplierDetailComponent :isOpen="isOpenDetail" @closeModal="isOpenDetail = false" @loadOrder="closeandload"
        :orderdata="orderSelected">
    </orderSupplierDetailComponent>
</template>

<script>
import { getAllStatusOrder, getListAllOrder } from '@/api/orderApi';
import TableComponent from '../table/TableComponent.vue';
import { mapGetters } from 'vuex';
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';
import Pagination from '../pagination/Pagination.vue';
import orderSupplierDetailComponent from './orderSupplierDetailComponent.vue';


export default {
    name: "orderClientComponent",
    components: {
        TableComponent,
        Pagination,
        orderSupplierDetailComponent,

    },
    data() {
        return {
            orderSelected: null,
            isOpenDetail: false,
            idRoleStatus: true,
            limit: 5,
            type: 1,
            idStatus: null,
            statusOrder: [],
            listOrder: [],
            loading: false,
            page: 0,
            pagination: null,
            sortField: "id",
            sortDirection: "desc",
        }
    },
    async mounted() {
        await this.getListStatus();
        this.getListAll();
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    methods: {
        formatCurrencyVN,
        formatDay,

        isOpenModalDetail(data) {
            console.log(data);
            this.orderSelected = data;
            this.isOpenDetail = !this.isOpenDetail
        },

        closeandload() {
            this.isOpenDetail = false;
            this.getListAll();
        },
        async getListStatus() {
            try {
                const data = {
                    type: this.type
                }
                const res = await getAllStatusOrder(data);
                this.statusOrder = res.data;
                console.log(this.statusOrder);
            } catch (error) {
                console.error(error);
            }
        },
        async getListAll() {
            try {
                const data = {
                    idRoleStatus: this.idRoleStatus,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                }
                const res = await getListAllOrder(data);
                this.listOrder = res.data.content;
                this.pagination = res.data;
                console.log(this.listOrder);
            } catch (error) {
                console.error(error);
            }
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getListAll();
        },
        handleLimitChange(limitPagination) {
            this.limit = limitPagination;
            this.page = 0;
            this.getListAll();
        }, async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
            } else {
                this.sortField = column;
                this.sortDirection = "asc";
            }
            await this.getListAll();
        },
        getSortIcon(column) {
            if (this.sortField === column) {
                return this.sortDirection === "asc"
                    ? "<i class='bx bx-sort-a-z'></i>"
                    : "<i class='bx bx-sort-z-a'></i>";
            }
            return "";
        },
    }

}
</script>

<style></style>