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
                <select v-model="statusFilter" id="receiverName"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="true">Đang cần xử lý</option>
                    <option value="false">Tất cả</option>
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
                <th @click="changeSort('totalPrice')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TỔNG TIỀN <span v-html="getSortIcon('totalPrice')"></span>
                </th>
                <th @click="changeSort('vouchers')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    SỐ LƯỢNG SẢN PHẨM <span v-html="getSortIcon('vouchers')"></span>
                </th>
                <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    PHIẾU GIẢM GIÁ <span v-html="getSortIcon('id')"></span>
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
                    GHI CHÚ <span v-html="getSortIcon('id')"></span>
                </th>
            </template>
            <template #body>
                <tr @click="openModalDetailOrder(item)" v-for="(item, index) in listOrder" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ formatCurrencyVN(item.totalPrice) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.orderDetails.length }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.vouchers[0]?.voucher?.code || 'Không có mã' }}
                    </td>

                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ formatDay(item.createOderTime) }}
                    </td>

                    <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <div class="flex items-center space-x-4">
                            <!-- Dropdown trạng thái đơn hàng -->
                            <select @click.stop v-model="item.orderStatus.id"
                                @change="updateOrderSelected(item, item.orderStatus.id)"
                                class="border border-gray-300 rounded-md py-2 px-3 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option v-for="statusItem in statusOrder" :key="statusItem.id" :value="statusItem.id"
                                    :disabled="statusItem.id !== item.orderStatus.id">
                                    {{ statusItem.status }}
                                </option>
                            </select>

                            <!-- Nút duyệt đơn, chỉ hiển thị khi trạng thái là 1 -->
                            <div v-if="item.orderStatus.id === 1">
                                <button @click.stop="updateOrderSelected(item, 6)"
                                    class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Duyệt Đơn
                                </button>
                                <button @click.stop="updateOrderSelected(item, 17)"
                                    class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">

                                </button>
                            </div>
                        </div>
                    </td>



                    <td @click.stop="openModalUpdate(item)"
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <i class='bx bxs-edit-alt'></i>
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

        <orderUpdateComponent @update-success:="getListAll" :isOpen="isOpenModelUpdate"
            @close="isOpenModelUpdate = false" :order="orderSelected">
        </orderUpdateComponent>
        <orderDetailComponent :isOpen="isOpenModalDetailOrder" @close="isOpenModalDetailOrder = false"
            :order="orderSelected">
        </orderDetailComponent>
    </div>
</template>

<script>
// import Button from '../buttons/button.vue';
import orderDetailComponent from '../order/orderDetailComponent.vue';
import orderUpdateComponent from '../order/orderUpdateComponent.vue';
import { getAllStatusOrder, getListAllOrder, updateOrder } from '@/api/orderApi';
import TableComponent from '../table/TableComponent.vue';
import { mapGetters } from 'vuex';
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';
import Pagination from '../pagination/Pagination.vue';
import notificationService from '@/services/notificationService';
export default {
    name: "orderClientComponent",
    components: {
        // Button,
        TableComponent,
        Pagination,
        orderUpdateComponent,
        orderDetailComponent
    },
    data() {
        return {
            keysearch: null,
            isOpenModalDetailOrder: false,
            isOpenModelUpdate: false,
            orderSelected: null,
            idRoleStatus: false,
            limit: 5,
            type: 0,
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

        async getListStatus() {
            try {
                const data = {
                    type: this.type
                }
                const res = await getAllStatusOrder(data);
                this.statusOrder = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getListAll() {
            try {
                const data = {
                    orderCode: this.keysearch,
                    idRoleStatus: this.idRoleStatus,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                }
                const res = await getListAllOrder(data);
                this.listOrder = res.data.content;
                this.pagination = res.data;
            } catch (error) {
                console.error(error);
            }
        },

        async updateOrderSelected(dataOrder, idOrder) {

            try {
                const data = {
                    orderStatus: {
                        id: idOrder

                    }
                };
                console.log("id status: " + data)
                await updateOrder(dataOrder.id, data);
                this.getListAll()
                notificationService.success("Cập nhật thành công");
            } catch (error) {
                console.error('Lỗi khi cập nhật đơn hàng:', error);
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
        openModalUpdate(data) {
            console.log(data);
            this.isOpenModelUpdate = true;
            this.orderSelected = data;
        },
        openModalDetailOrder(data) {
            console.log(data);
            this.orderSelected = data;
            this.isOpenModalDetailOrder = !this.isOpenModalDetailOrder;
        }
    }

}
</script>

<style></style>