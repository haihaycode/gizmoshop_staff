<template>
    <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
        <template #header>
            <div class="text-3xl font-bold mb-6">
                Các sản phẩm đã được cung cấp của nhà cung cấp: &nbsp;
                <span class="text-indigo-600 font-bold">{{ dataAuthor.fullname }}</span>
            </div>
        </template>
        <template #body>
            <TableComponent :items="listProduct" :headers="headers" :isLoading="isLoading">
                <template #header>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">STT</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">TÊN SẢN
                        PHẨM</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">SỐ LƯỢNG
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">GIÁ TIỀN
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">NGÀY CUNG
                        CẤP</th>
                </template>
                <template #body>
                    <tr v-for="(item, index) in listProduct" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.productName }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                            item.productInventoryResponse?.quantity }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                            formatCurrencyVN(item.productPrice) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                            formatDay(item.productCreationDate) }}</td>
                    </tr>
                </template>
                <template #footer>
                    <td colspan="5"></td>
                </template>
                <template #pagination>
                    <div>
                        <Pagination :total-items="Number(pagination.totalElements)" :items-per-page="limit"
                            :current-page="page + 1" @page-changed="handlePageChange"
                            @limit-changed="handleLimitChange">
                        </Pagination>
                    </div>
                </template>
            </TableComponent>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue'
import { getListProductAuthor } from '@/api/supplierApi'
import { mapGetters } from 'vuex'
import TableComponent from '../table/TableComponent.vue'
import { formatCurrencyVN, formatDay } from '@/utils/currencyUtils'
import Pagination from '../pagination/Pagination.vue'

export default {
    name: 'DetailProductSupplier',
    data() {
        return {
            pagination: {},
            dataAuthor: {},
            listProduct: [],
            page: 0,
            limit: 5,
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        author: {
            type: Object,
            default: () => ({}),
        }
    },
    emits: ['closeModal'],
    components: {
        TableComponent,
        ModalBox,
        Pagination
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    methods: {
        formatDay,
        formatCurrencyVN,
        closeModal() {
            this.$emit('closeModal');
        },
        async getListProduct() {
            const data = {
                page: this.page,
                limit: this.limit,
            }
            try {
            
                const res = await getListProductAuthor(Number(this.author.accountResponse.id), data);
                this.listProduct = res.data.content;
                this.pagination = res.data;
                console.log(this.listProduct);
            } catch (error) {
                console.log(error);
            }
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getListProduct();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.getListProduct();
        },

    },
    watch: {
        author: {
            handler(newVal) {
                this.dataAuthor = { ...newVal };
                this.getListProduct();
            },
            immediate: true,
            deep: true,
        }
    }
}
</script>
