<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :footerIsActive="true" :loading="isLoading">
            <template #header>
                <h2 class="sm:text-sm md:text-lg font-bold"> Chi tiết đơn hàng</h2>
            </template>
            <template #body>
                <TableComponent :items="orderDetails">
                    <template #header>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Stt
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tên
                            sản phẩm</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Số
                            lượng</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Giá
                            gốc
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Giá
                            mua
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tổng
                            tiền sản phẩm</th>
                    </template>
                    <template #body>
                        <tr v-for="(item, index) in orderDetails" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ index + 1 }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ item.product?.productName }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ item.quantity }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ formatCurrencyVN(item.price) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ formatCurrencyVN(item.price * (1 - (item.product?.discountProduct || 0) / 100)) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ formatCurrencyVN(item.quantity * item.price * (1 - (item.product?.discountProduct ||
                                0) / 100)) }}
                            </td>
                        </tr>
                    </template>
                </TableComponent>
            </template>
            <template #footer>
                <div class="flex justify-between items-center gap-4">
                    <div v-if="dataOrder.note" class="border border-gray-300 p-4 rounded-md">
                        <h3 class="text-gray-700 text-lg font-semibold mb-2">Ghi chú</h3>
                        <p class="text-gray-600 text-sm">{{ dataOrder.note || 'Không có ghi chú' }}</p>
                    </div>
                    <div>
                        <span>Giảm giá của Voucher: </span>
                        <input readonly :value="formatCurrencyVN(discount)" type="text"
                            class="border-2 border-gray-300 rounded-md px-2 py-1" />
                    </div>
                    <div>
                        <span>Tổng thanh toán: </span>
                        <input readonly :value="formatCurrencyVN(dataOrder.totalPrice)" type="text"
                            class="border-2 border-gray-300 rounded-md px-2 py-1" />
                    </div>
                </div>
            </template>
        </ModalBox>
    </div>
</template>


<script>

import ModalBox from '../modal/ModalBox.vue';
import TableComponent from '../table/TableComponent.vue';
import { formatCurrencyVN } from '@/utils/currencyUtils';
import { mapGetters } from 'vuex';
export default {
    name: 'orderDetailComponent',
    data() {
        return {
            discount: 0,
            orderDetails: null,
            dataOrder: {
            },
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        order: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    emits: ['close'],
    computed: {
        ...mapGetters("loading", ['isLoading'])
    },
    components: {
        ModalBox,
        TableComponent
    },
    methods: {
        formatCurrencyVN,
        closeModal() {
            this.$emit('close');
        },
    },
    watch: {
        order: {
            handler(newOrder) {
                console.log("Chi tiết đơn hàng: ", newOrder?.orderDetails);
                const extractNoteBeforeSeparator = (note) => {
                    return note?.split('||')[0]?.trim() || '';
                };
                this.dataOrder = {
                    ...newOrder,
                    id: newOrder?.id || null,
                    note: extractNoteBeforeSeparator(newOrder?.note),
                    idStatus: newOrder?.orderStatus && { id: newOrder.orderStatus.id },
                    totalPrice: newOrder?.totalPrice || 0,
                    vouchers: newOrder?.vouchers || [],

                };
                this.orderDetails = this.dataOrder?.orderDetails || [],
                    this.discount = this.dataOrder.vouchers?.[0]?.voucher
                        ? (this.dataOrder.vouchers[0].voucher.discountPercent
                            ? Math.min(
                                (this.dataOrder.vouchers[0].voucher.discountPercent / 100) * this.dataOrder.totalPrice,
                                this.dataOrder.vouchers[0].voucher.maxDiscountAmount // Giới hạn mức giảm tối đa
                            )
                            : this.dataOrder.vouchers[0].voucher.discountAmount)
                        : 0;


                console.log("dataOrder sau khi gán: ", this.orderDetails);
            },
            deep: true,
        },
    }
}
</script>

<style></style>