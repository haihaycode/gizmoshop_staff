<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal">
            <template #header>
                <h1 class="text-xl font-semibold text-center mb-4">Chi tiết đơn hàng của nhà cung cấp: {{
                    order.supplierDto?.id }}</h1>
            </template>

            <template #body>
                <!-- Mã đơn hàng -->
                <div class="mb-6">
                    <strong class="block font-medium text-gray-700">Mã đơn hàng:</strong>
                    <span class="text-gray-500">{{ order.orderCode }}</span>
                </div>

                <!-- Trạng thái đơn hàng -->
                <div class="mb-6">
                    <strong class="block font-medium text-gray-700">Trạng thái:</strong>
                    <span class="text-gray-500">{{ order.orderStatus?.status }}</span>
                </div>

                <!-- Thông tin người dùng -->
                <div class="mb-6">
                    <strong class="block font-medium text-gray-700">Thông tin nhà cung cấp:</strong>
                    <p class="text-gray-500"><strong>Tên Người cung cấp:</strong> {{ order.account?.fullname }}
                    </p>
                    <p class="text-gray-500"><strong>Tên nhà cung cấp:</strong> {{ order.supplierDto?.nameSupplier }}
                    </p>
                    <p class="text-gray-500"><strong>Mã số thuể:</strong> {{ order.supplierDto?.tax_code }}</p>
                </div>

                <!-- Thông tin đơn hàng -->
                <div class="mb-6">
                    <strong class="block font-medium text-gray-700">Thông tin đơn hàng:</strong>
                    <p class="text-gray-500"><strong>Ghi chú:</strong> {{ order.note }}</p>
                    <p class="text-gray-500"><strong>Tổng giá trị đơn hàng:</strong> {{
                        formatCurrencyVN(order.totalPrice ||
                            0) }}</p>
                    <p class="text-gray-500"><strong>Tổng trọng lượng:</strong> {{ order.totalWeight }} kg</p>
                </div>

                <!-- Chi tiết sản phẩm -->
                <div class="mb-6">
                    <strong class="block font-medium text-gray-700 mb-3">Chi tiết sản phẩm:</strong>

                    <TableComponent :items="order.orderDetails">
                        <template #header>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                STT</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                SẢN PHẨM</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                ẢNH MẪU</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                GIÁ SẢN PHẨM</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                GIẢM GIÁ</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                GIÁ BÁN</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                SỐ LƯỢNG</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                TỔNG</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                                TRẠNG THÁI</th>
                            <th v-if="isCheckboxVisible"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                            </th>
                        </template>
                        <template #body>
                            <tr v-for="(orderDetail, index) in order.orderDetails" :key="index" class="border-b-4">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1
                                    }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    orderDetail.product?.productName }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <img :src="loadImage(orderDetail.product?.thumbnail, 'product')" alt=""
                                        @error="this.src = 'fallback-image-url.jpg'" class="w-16 h-16">
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    formatCurrencyVN(orderDetail.product?.productPrice || 0) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    orderDetail.product?.discountProduct || 0 }}%</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ formatCurrencyVN(
                                        (orderDetail.product?.productPrice || 0) * (1 -
                                            (orderDetail.product?.discountProduct || 0) / 100)
                                    ) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    orderDetail.quantity }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    formatCurrencyVN(orderDetail.total || 0) }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                                    orderDetail.product?.productStatusResponse?.name }}</td>
                                <td v-if="isCheckboxVisible"
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <input type="checkbox" :value="orderDetail.id"
                                        @change="toggleSelection(orderDetail.product.id, $event)" />
                                </td>

                            </tr>


                        </template>
                    </TableComponent>
                    <div class="flex gap-4" v-if="isButtonVisible">
                        <Button @click="handleButtonClick(true)"
                            class="mt-2 BG-BLUE-500 TEXT-WHITE PX-4 PY-2 ROUNDED HOVER:BG-BLUE-600"
                            :text="'Xác Nhận'"></Button>

                        <Button class="mt-2 BG-BLUE-500 TEXT-WHITE PX-4 PY-2 ROUNDED HOVER:BG-BLUE-600"
                            @click="handleButtonClick(false)" :text="'Từ chối'"></Button>
                    </div>
                </div>

                <!-- Voucher -->
                <div v-if="order.vouchers && order.vouchers.length" class="mb-6">
                    <strong class="block font-medium text-gray-700">Voucher áp dụng:</strong>
                    <ul class="list-inside">
                        <li v-for="(voucher, index) in order.vouchers" :key="index" class="mb-4">
                            <div><strong class="font-medium text-gray-700">Mã voucher:</strong> {{ voucher.voucher?.code
                                }}</div>
                            <div><strong class="font-medium text-gray-700">Giảm giá:</strong> {{
                                voucher.voucher?.discountPercent }}%</div>
                        </li>
                    </ul>
                </div>

                <!-- Thông tin hợp đồng -->
                <div v-if="order.contractresponse" class="mb-6">
                    <strong class="block font-medium text-gray-700">Thông tin hợp đồng:</strong>
                    <div><strong class="font-medium text-gray-500">Tổng phí duy trì:</strong> {{
                        formatCurrencyVN(order.contractresponse?.contractMaintenanceFee || 0) }}</div>
                    <div><strong class="font-medium text-gray-500">Mã hợp đồng:</strong> {{
                        order.contractresponse?.contractId }}</div>
                    <div><strong class="font-medium text-gray-500">Ngày bắt đầu:</strong> {{
                        formatDay(order.contractresponse?.start_date || date) }}</div>
                    <div><strong class="font-medium text-gray-500">Ngày hết hạn:</strong> {{
                        formatDay(order.contractresponse?.expirationDate || date) }}</div>
                </div>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import TableComponent from '../table/TableComponent.vue';
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils';
import { loadImage } from '@/services/imageService';
import Button from '../buttons/button.vue';
import { approveOrder, approveorderfinal } from '@/api/supplierApi';
import notificationService from '@/services/notificationService';


export default {
    name: 'orderSupplierDetailComponent',
    components: {
        Button,
        ModalBox,
        TableComponent,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        orderdata: {
            type: Object,
            required: true
        }
    },
    emits: ['closeModal', 'loadOrder'],
    data() {
        return {
            isOpenButton: false,
            selectedOrder: new Set(),
            isCheckboxVisible: false,
            isButtonVisible: false,
            order: {}
        };
    },
    mounted() {
        this.order = { ...this.orderdata };
        this.selectedOrder = new Set(this.order.orderDetails?.map(detail => detail.product?.id) || []);
    },
    methods: {
        formatDay,
        loadImage,
        formatCurrencyVN,
        closeModal() {
            this.$emit('closeModal');
        },
        toggleSelection(id, event) {
            if (event.target.checked) {
                this.selectedOrder.delete(id);
            } else {
                this.selectedOrder.add(id);
            }
        },

        handleButtonClick(status) {
            if (this.isCheckboxVisible) {
                this.confirmSelection(status);
            } else {

                this.finalOrderSupplier(status);
            }
        },
        async confirmSelection(status) {
            const selectedIds = Array.from(this.selectedOrder);
            if (selectedIds.length >= (this.order.orderDetails?.length || 0) && status == true) {
                notificationService.error('Vui lòng chọn ít nhất một sản phẩm đơn hàng.');
                return;
            }

            console.log('Selected IDs:', selectedIds);
            try {
                const data = {
                    idProducts: selectedIds.join(','),
                    accept: status,
                }
                const res = await approveOrder(this.order.id, data);
                console.log(res.data);
                this.$emit('loadOrder')
                notificationService.success('Xác nhận đơn hàng thành công');
            } catch (error) {
                notificationService.error('Xác nhận đơn hàng thất bại');
                console.error(error)
            }
        },
        async finalOrderSupplier(status) {
            try {
                const data = {
                    accept: status,
                }
                const res = await approveorderfinal(this.order.id, data);
                console.log(res.data);
                this.$emit('loadOrder')
                notificationService.success('Xác nhận đơn hàng thành công');
            } catch (error) {
                notificationService.error('Xác nhận đơn hàng thất bại');
                console.error(error)
            }
        },

    },
    watch: {
        orderdata: {
            handler(newData) {
                this.order = { ...newData };
                this.isCheckboxVisible = newData.orderStatus?.id === 26;
                this.isButtonVisible = [26, 20].includes(newData.orderStatus?.id);
                this.selectedOrder = new Set(newData.orderDetails?.map(detail => detail.product.id) || []);
            },
            deep: true
        }
    }
};
</script>

<style scoped></style>