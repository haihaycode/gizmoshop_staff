<template>
    <div class="p-4 bg-white shadow-md rounded mb-4">
        <form @submit.prevent="getListAll()" class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
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
                <select @change="getListAll()" v-model="idProcessing" id="receiverName"
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
                <th @click="changeSort('')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TÊN KHÁCH HÀNG <span v-html="getSortIcon('')"></span>
                </th>
                <th @click="changeSort('totalPrice')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TỔNG TIỀN <span v-html="getSortIcon('totalPrice')"></span>
                </th>
                <th @click="changeSort('')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    SỐ LƯỢNG SẢN PHẨM <span v-html="getSortIcon('')"></span>
                </th>
                <th @click="changeSort('')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    PHIẾU GIẢM GIÁ <span v-html="getSortIcon('')"></span>
                </th>
                <th @click="changeSort('createOderTime')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    NGÀY TẠO <span v-html="getSortIcon('createOderTime')"></span>
                </th>
                <th @click="changeSort('')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TRẠNG THÁI <span v-html="getSortIcon('')"></span>
                </th>
                <!-- <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    GHI CHÚ <span v-html="getSortIcon('id')"></span>
                </th> -->
            </template>
            <template #body>
                <tr @click="openModalDetailOrder(item)" v-for="(item, index) in listOrder" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.account?.fullname }}
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
                            <div v-if="item.orderStatus.id !== 1">
                                <select @click.stop v-model="item.orderStatus.id"
                                    @change="updateOrderSelected(item, item.orderStatus.id)"
                                    class="border border-gray-300 rounded-md py-2 px-3 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option v-for="statusItem in statusOrder" :key="statusItem.id"
                                        :value="statusItem.id" :disabled="statusItem.id !== item.orderStatus.id">
                                        {{ statusItem.status }}
                                    </option>
                                </select>
                            </div>

                            <div v-if="item.orderStatus.id === 1" class="flex flex-col space-y-2">
                                <button @click.stop="openModalUpdate(item, true)"
                                    class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Duyệt Đơn
                                </button>
                                <button @click.stop="openModalUpdate(item, false)"
                                    class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Hủy Đơn
                                </button>
                            </div>
                        </div>
                    </td>



                    <!-- <td @click.stop="openModalUpdate(item)"
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <i class='bx bxs-edit-alt'></i>
                    </td> -->
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
        <orderDetailComponent :isOpen="isOpenModalDetailOrder" @close="isOpenModalDetailOrder = false"
            :order="orderSelected">
        </orderDetailComponent>


        <ModalBox :loading="isLoading" :footerIsActive="true" :isOpen="isOpenModelUpdate"
            :closeModal="handleCloseModal">
            <template #header>
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">{{ dataModale.header }}</h2>
            </template>
            <template #body>
                <h1 class="text-lg font-medium text-gray-700 mb-4">{{ dataModale.title }}</h1>
                <div class="mb-4">
                    <textarea v-model="dataModale.note"
                        class="shadow-sm border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập ghi chú cho đơn hàng"></textarea>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end space-x-4">
                    <button
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        v-for="(text, index) in dataModale.textbutton" :key="index"
                        @click="updateOrderSelected(dataModale, text)">
                        {{ text }}
                    </button>
                </div>
            </template>
        </ModalBox>



    </div>
</template>

<script>
// import Button from '../buttons/button.vue';
import ModalBox from '../modal/ModalBox.vue';
import orderDetailComponent from '../order/orderDetailComponent.vue';
import { getAllStatusOrder, getListAllOrder, updateOrder } from '@/api/orderApi';
import TableComponent from '../table/TableComponent.vue';
// import { mapGetters } from 'vuex';
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';
import Pagination from '../pagination/Pagination.vue';
import notificationService from '@/services/notificationService';
export default {
    name: "orderClientComponent",
    components: {
        // Button,
        TableComponent,
        Pagination,
        ModalBox,
        orderDetailComponent
    },
    data() {
        return {
            idProcessing: false,
            isLoading: true,
            dataModale: {},
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
    methods: {
        formatCurrencyVN,
        formatDay,

        handleCloseModal() {
            this.isOpenModelUpdate = false;
        },

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
        async getListAll(orderCoder) {
            try {
                if (orderCoder) {
                    this.keysearch = orderCoder;
                }
                const data = {
                    orderCode: this.keysearch,
                    idRoleStatus: this.idRoleStatus,
                    idProcessing: this.idProcessing,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`,
                }
                const res = await getListAllOrder(data);
                console.log("đầy là dữ liệu trả về:", res.data)
                this.listOrder = res.data.content;
                this.pagination = res.data;
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },

        async updateOrderSelected(dataOrder, text) {
            try {
                console.log('dataOrder:', dataOrder);
                let data = {};
                if (text === 'Xác nhận đơn') {
                    data = {
                        res: {
                            orderStatus: { id: 6 },
                            note: `${dataOrder.data.note}||${dataOrder.note}`,
                        },
                    };
                } else if (text === 'Hủy bỏ') {
                    this.handleCloseModal();
                    console.log('Hủy bỏ đơn hàng:', dataOrder);
                    return;
                } else {
                    data = {
                        res: {
                            orderStatus: { id: 17 },
                            note: `${dataOrder.data.note}||${dataOrder.note}`,
                        },
                    };
                }

                console.log('Dữ liệu gửi lên:', data.res);
                await updateOrder(dataOrder.data.id, data.res);
                this.getListAll();
                this.isLoading = false;
                this.handleCloseModal();

                notificationService.success("Cập nhật thành công");
            } catch (error) {
                notificationService.success("Cập nhật thất bại");
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
        openModalUpdate(item, noteStatus) {
            if (noteStatus) {
                this.dataModale = {
                    header: `Đơn hàng của khách hàng ${item.account?.fullname}`,
                    title: "Ghi chú của nhân viên cho đơn hàng",
                    data: item,
                    noteStatus: noteStatus,
                    note: '',
                    textbutton: ["Xác nhận đơn"],
                }
            } else {
                this.dataModale = {
                    header: "Cảnh báo",
                    title: "Bạn đang muốn hủy đơn hàng này, bạn có chắc chắn muốn hủy đơn hàng này không?",
                    noteStatus: noteStatus,
                    data: item,
                    note: '',
                    textbutton: ["Chấp nhận", "Hủy bỏ"],
                }
            }

            this.isOpenModelUpdate = true;
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