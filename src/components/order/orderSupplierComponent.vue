<template>
    <div class="p-4 bg-white shadow-md rounded mb-4">
        <form @submit.prevent="getListAll" class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
            <!-- Tìm theo mã đơn hàng -->
            <div class="w-full lg:w-1/3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="orderCode">Tìm theo mã đơn hàng</label>
                <input v-model="keysearch" id="orderCode" type="text"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập Mã đơn hàng: ORD..." />
            </div>

            <!-- Tìm theo tên người nhận -->
            <div class="w-full lg:w-1/6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="receiverName">Tìm theo trạng thái</label>
                <select @change="getListAll" v-model="idProcessing" id="receiverName"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="false">Đang cần xử lý</option>
                    <option value="true">Tất cả</option>
                </select>
            </div>

            <!-- Nút tìm kiếm -->
            <div class="w-full lg:w-auto flex justify-end items-end space-x-2">
                <button type="submit"
                    class="bg-[#0e0b36] hover:bg-[#2a2eaed7] text-white font-bold py-2 px-4 rounded transition-all duration-300">
                    Tìm kiếm
                </button>
            </div>
        </form>
    </div>


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
                    SỐ LƯỢNG MẶT HÀNG<span v-html="getSortIcon('vouchers')"></span>
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
                    CHI TIẾT ĐƠN <span v-html="getSortIcon('id')"></span>
                </th>
            </template>
            <template #body>
                <tr @click="isOpenModalDetail(item)" v-for="(item, index) in listOrder" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.supplierDto?.nameSupplier }}
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
                            class="border w-40 border-gray-300 rounded py-2 px-3 text-gray-700 bg-gray-50 leading-tight focus:outline-none cursor-default">
                            <option v-for="statusItem in statusOrder" :key="statusItem.id" :value="statusItem.id"
                                :disabled="statusItem.id !== item.orderStatus.id">
                                {{ statusItem.status }}
                            </option>
                        </select>
                        <i v-if="item.orderStatus.id == 20 || item.orderStatus.id == 26"
                            class='bx bx-message-square-minus bx-flashing text-2xl'></i>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <i class='bx bx-info-square text-2xl'></i>

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
            idProcessing: true,
            isLoading: true,
            keysearch: null,
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
                    idProcessing: this.idProcessing,
                    orderCode: this.keysearch,
                    idRoleStatus: this.idRoleStatus,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                }
                const res = await getListAllOrder(data);
                this.listOrder = res.data.content;
                this.pagination = res.data;
                console.log(this.listOrder);
                this.isLoading = false;
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