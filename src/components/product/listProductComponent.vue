<template>
    <div>
        <SearchProductCompoment @search="getDataProduct"></SearchProductCompoment>
        <TableComponent :items="products" :loading="isLoading">
            <template #header>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    STT <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TÊN SẢN PHẨM <span v-html="getSortIcon('name')"></span>
                </th>
                <th @click="changeSort('price')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    GIÁ GỐC <span v-html="getSortIcon('price')"></span>
                </th>
                <th @click="changeSort('category.name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    DANH MỤC <span v-html="getSortIcon('category.name')"></span>
                </th>
                <th @click="changeSort('productBrand.name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    THƯƠNG HIỆU <span v-html="getSortIcon('productBrand.name')"></span>
                </th>
                <th @click="changeSort('productInventoryResponse.inventory.inventoryName')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    KHO <span v-html="getSortIcon('productInventoryResponse.inventory.inventoryName')"></span>
                </th>
                <th @click="changeSort('fullname')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    NGƯỜI TẠO <span v-html="getSortIcon('fullname')"></span>
                </th>
                <th @click="changeSort('createAt')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    NGÀY KHỞI TẠO <span v-html="getSortIcon('createAt')"></span>
                </th>
                <th @click="changeSort('productStatusResponse.name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TRẠNG THÁI <span v-html="getSortIcon('productStatusResponse.name')"></span>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">THAO TÁC</th>
            </template>
            <template #body>
                <tr v-for="item in formatData" :key="item.id" class="hover:bg-gray-300">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.productName }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        item.productPrice.toLocaleString() }} VNĐ</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        item.productCategories.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.productBrand.name
                        }}</td>
                    <td @mouseover="showTooltipBox('productInventory', item, $event)" @mouseleave="hideTooltip"
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.productInventoryResponse?.inventory?.inventoryName || 'Không có dữ liệu' }}</td>
                    <td @mouseover="showTooltipBox('authorProduct', item, $event)" @mouseleave="hideTooltip"
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.author.fullname }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        item.productCreationDate }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <select
                            v-model="item.productStatusResponse.id"
                            @change="handleStatusChange(item.id, item.productStatusResponse.id)"
                            class="border w-40 border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option v-for="statusItem in status" :key="statusItem.id" :value="statusItem.id">
                                {{ statusItem.name }}
                            </option>
                        </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Button :icon="`<i class='bx bxs-edit text-xl'></i>`" :text="''"></Button>
                    </td>
                </tr>
            </template>
            <template #footer>
                <td colspan="8"></td>
            </template>
            <template #pagination>
                <div>
                    <Pagination :total-items="pagination?.totalElements || 1" :items-per-page="size"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>

        <TooltipBox ref="tooltipBox" :bgColor="'bg-gray-800'" :textColor="'text-white'" v-show="tooltipVisible">
            <template v-slot:header>
                <strong>{{ tooltipContent.title }}</strong>
            </template>
            <template v-slot:body>
                <div v-if="tooltipContent.content" v-html="tooltipContent.content"></div>
            </template>
            <template v-slot:footer></template>
        </TooltipBox>
    </div>
</template>

<script>
import TableComponent from '../table/TableComponent.vue';
import TooltipBox from '../tooltip/TooltipBox.vue';
import { getProduct, getStatusProduct } from '@/api/productApi';
import Button from '../buttons/button.vue';
import { mapGetters } from 'vuex';
import Pagination from '../pagination/Pagination.vue';
import { formatDay } from '@/utils/currencyUtils'
// import searchComponent from '../search/searchComponent.vue';
import SearchProductCompoment from './SearchProductCompoment.vue';
import { loadImage } from '@/services/imageService.js';
export default {
    name: 'ListVoucherComponent',
    components: {
        TableComponent,
        Button,
        Pagination,
        TooltipBox,
        SearchProductCompoment
    },
    data() {
        return {
            idStatusSelected: null,
            status: [],
            products: [],
            selectedStatus: null,
            tooltipVisible: false,
            tooltipContent: {
                title: '',
                content: ''
            },
            page: 0,
            size: 5,
            pagination: null,
            deleted: null,
            sortField: "id",
            sortDirection: "desc",
            tooltipKeys: {
                productInventory: {
                    title: 'Kho',
                    content: item => `
            <div><strong>ID Kho:</strong> ${item.productInventoryResponse?.inventory?.id || 'null'}</div>
            <div><strong>Tên Kho:</strong> ${item.productInventoryResponse?.inventory?.inventoryName || 'null'}</div>
            <div><strong>Số Lượng:</strong> ${item.productInventoryResponse?.quantity}</div>
            <div><strong>Địa chỉ:</strong> ${item.productInventoryResponse?.inventory?.city || 'null'}, ${item.productInventoryResponse?.inventory?.district || 'null'}, ${item.productInventoryResponse?.inventory?.commune || 'null'}</div>
            <div><strong>Trạng thái:</strong> ${item.productInventoryResponse?.inventory?.active ? 'Hoạt động' : 'Không hoạt động'}</div>
        `,
                },
                authorProduct: {
                    title: 'Người Tạo',
                    content: item => `
            <div><strong>ID Người Tạo:</strong> ${item.author?.id || 'null'}</div>
            <div><strong>Tên Người Tạo:</strong> ${item.author?.fullname || 'null'}</div>
             <div><strong>Ảnh Đại Diện:</strong> 
            ${item.author
                            ? `<img src="${loadImage(item.author.image, 'account')}" alt="Profile Image" class="w-6 h-6 rounded-full object-cover" />`
                            : 'Không có ảnh'}
        </div>
            
        `,
                },
            }
        };
    },
    async mounted() {
        await this.getListStatusProduct();
        this.getDataProduct();
    },

    computed: {
        ...mapGetters("loading", ["isLoading"]),
        formatData() {
            return this.products.map(item => {
                console.log(item.productStatusResponse.id);
                return {
                    ...item,
                    productCreationDate: formatDay(item.productCreationDate)
                }
            });
        },
    },
    methods: {
        loadImage,
        handleStatusChange(productId, selectedStatusId) {
            console.log('Product ID:', productId);
            console.log('Selected Status ID:', selectedStatusId);
        },
        async getDataProduct(keyWord) {
            try {
                const reqData = {
                    productName: keyWord,
                    deleted: this.deleted,
                    page: this.page,
                    limit: this.size,
                    sort: `${this.sortField},${this.sortDirection}`,
                };
                const res = await getProduct(reqData);
                this.products = res.data.content;
                this.pagination = res.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getListStatusProduct() {
            try {
                const res = await getStatusProduct()
                this.status = res.data
                console.log(this.status)
            } catch (error) {
                console.error(error)
            }
        },

        getTooltipContent(key, item) {
            const tooltipData = this.tooltipKeys[key] || {};
            return {
                title: tooltipData.title || `Chi tiết ${key}`,
                content: tooltipData.content ? tooltipData.content(item) : item[key] || 'Không có dữ liệu',

            };
        },

        showTooltipBox(key, item, event) {
            const tooltipContent = this.getTooltipContent(key, item);
            this.tooltipContent = tooltipContent;
            this.$refs.tooltipBox.updateTooltipData(tooltipContent.title, tooltipContent.content);
            this.$refs.tooltipBox.setTooltipPosition(event);
            this.tooltipVisible = true;
        },

        hideTooltip() {
            this.tooltipVisible = false;
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getDataProduct();
        },
        handleLimitChange(limitPagination) {
            this.size = limitPagination;
            this.page = 0;
            this.getDataProduct();
        },
        async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
            } else {
                this.sortField = column;
                this.sortDirection = "asc";
            }
            await this.getDataProduct();
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
};
</script>

<style scoped></style>
