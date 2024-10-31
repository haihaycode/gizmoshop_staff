<template>
    <div>
        <TableComponent :items="products">
            <template #header>
                <th @click=" changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    STT <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TÊN SẢN PHẨM <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    GIÁ GỐC <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    GIÁ ĐANG BÁN <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    GIẢM GIÁ THEO % <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    MÔ TẢ <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    ẢNH ĐẠI DIỆN <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    DANH MỤC <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    THƯƠNG HIỆU <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    NGƯỜI TẠO <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    SỐ LƯỢNG/KHO <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    THÔNG TIN CƠ BẢN <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TRẠNG THÁI <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    THAO TÁC <span v-html="getSortIcon('id')"></span>
                </th>
            </template>
            <template #body>
                <tr v-for="(product, index) in products" :key="product.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.originalPrice.toLocaleString() }} VNĐ</td>
                    <td>{{ product.currentPrice.toLocaleString() }} VNĐ</td>
                    <td>{{ product.discountPercentage }}%</td>
                    <td>{{ product.description }}</td>
                    <td>
                        <img :src="product.imageUrl" alt="Ảnh đại diện" width="50" />
                    </td>
                    <td>{{ product.category.name }}</td>
                    <td>{{ product.brand.name }}</td>
                    <td>
                        <div @mouseover="showTooltipBox(index, $event)" @mouseleave="hideTooltip"
                            class="relative inline-block cursor-pointer">
                            {{ product.creator.name }}
                        </div>
                    </td>
                    <td>{{ product.inventory.quantity }} tại {{ product.inventory.inventoryName }}</td>
                    <td>
                        {{ product.inventory.city }}, {{ product.inventory.district }}, {{ product.inventory.commune }}
                    </td>
                    <td>{{ product.status.name }}</td>
                    <td>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </td>
                </tr>
            </template>
            <template #footer>
                <td colspan="8"></td>
            </template>
        </TableComponent>


        <TooltipBox ooltipBox ref="tooltipBox">
            <template v-slot:header>
                <strong>{{ products[showTooltip]?.creator.name }}</strong>
            </template>
            <template v-slot:body>
                <p>Email: {{ products[showTooltip]?.creator.email }}</p>
                <p>Role: {{ products[showTooltip]?.creator.role.name }}</p>
                <img :src="products[showTooltip]?.creator.avatarUrl" alt="Avatar" class="w-12 h-12 rounded-full mb-2" />
            </template>
            <template v-slot:footer>
                <p class="text-gray-400">Thông tin bổ sung...</p>
            </template>
        </TooltipBox>
    </div>
</template>

<script>

import TableComponent from '../table/TableComponent.vue';
import TooltipBox from '../tooltip/TooltipBox.vue';

export default {
    name: 'ListVoucherComponent',
    components: {
        TableComponent,
        TooltipBox,
    },
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Sản phẩm A',
                    originalPrice: 100000,
                    currentPrice: 80000,
                    discountPercentage: 20,
                    description: 'Mô tả sản phẩm A',
                    imageUrl: 'path/to/product-image-a.jpg',

                    category: {
                        id: 1,
                        name: 'Danh mục 1',
                        imageUrl: 'path/to/category-image.jpg'
                    },
                    brand: {
                        id: 1,
                        name: 'Thương hiệu A',
                        imageUrl: 'path/to/brand-image.jpg'
                    },
                    creator: {
                        id: 1,
                        name: 'Nguyễn Văn A',
                        email: 'nguyenvana@example.com',
                        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgv_-3jTPi9rPOSPu7rarJNsEFkEDd3wjKkA&s',
                        role: {
                            id: 1,
                            name: 'ROLE_DOITAC'
                        }
                    },
                    inventory: {
                        id: 1,
                        inventoryName: 'Kho Hà Nội',
                        quantity: 10,
                        city: 'Hà Nội',
                        district: 'Quận Ba Đình',
                        commune: 'Phường Trúc Bạch'
                    },
                    status: {
                        id: 1,
                        name: 'Còn hàng',

                    }
                },
                {
                    id: 2,
                    name: 'Sản phẩm B',
                    originalPrice: 200000,
                    currentPrice: 150000,
                    discountPercentage: 25,
                    description: 'Mô tả sản phẩm B',
                    imageUrl: 'path/to/product-image-b.jpg',
                    category: {
                        id: 2,
                        name: 'Danh mục 2',
                        imageUrl: 'path/to/category-image-2.jpg'
                    },
                    brand: {
                        id: 2,
                        name: 'Thương hiệu B',
                        imageUrl: 'path/to/brand-image-2.jpg'
                    },
                    creator: {
                        id: 2,
                        name: 'Trần Thị B',
                        email: 'tranthib@example.com',
                        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgv_-3jTPi9rPOSPu7rarJNsEFkEDd3wjKkA&s',
                        role: {
                            id: 1,
                            name: 'ROLE_NHANVIEN'
                        }
                    },
                    inventory: {
                        id: 2,
                        inventoryName: 'Kho Hồ Chí Minh',
                        quantity: 5,
                        city: 'Hồ Chí Minh',
                        district: 'Quận 1',
                        commune: 'Phường Bến Nghé'
                    },
                    status: {
                        id: 2,
                        name: 'Hết hàng',

                    }
                }
            ],
            showTooltip: null,

        };
    },
    methods: {
        showTooltipBox(index, event) {
            this.showTooltip = index;
            this.$refs.tooltipBox.setTooltipPosition(event);
        },
        hideTooltip() {
            this.showTooltip = null;
            this.$refs.tooltipBox.hideTooltip();
        },
        async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
            } else {
                this.sortField = column;
                this.sortDirection = "asc";
            }
            await this.handlegetVouchers();
        }, getSortIcon(column) {
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

<style scoped>
/* Add your styles here */
</style>
