<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :footerIsActive="true" :loading="isLoading">
            <template #header>
                <h2 class="sm:text-sm md:text-lg font-bold"> Chi tiết đơn hàng</h2>
            </template>
            <template #body>
                <TableComponent>
                    <template #header>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Stt
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tên
                            sản phẩm</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Số
                            lượng</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Giá
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tổng
                            tiền</th>
                    </template>
                    <template #body>
                        <tr v-for="(item, index) in dataOrder?.orderDetails" :key="index">
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
                                {{ item.price }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ item.total }}
                            </td>
                        </tr>
                    </template>
                </TableComponent>
            </template>
            <template #footer>
                <div> <span>Tổng thanh toán: </span>
                    <input :value="formatCurrencyVN(dataOrder.totalPrice)" type="text"
                        class="border-2 border-gray-300 rounded-md px-2 py-1" />
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
            dataOrder: {},
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
                this.dataOrder = {
                    ...newOrder,
                    id: newOrder?.id || null,
                    note: newOrder?.note || '',
                    idStatus: newOrder?.orderStatus && { id: newOrder.orderStatus.id },
                    totalPrice: newOrder?.totalPrice || 0,
                    orderDetails: newOrder?.orderDetails || [],
                };
                console.log(" sản phẩm của order" + this.dataOrder.orderDetails);
            },
            deep: true
        }
    }


}
</script>

<style></style>