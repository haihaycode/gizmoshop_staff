<template>
    <div>
        <searchComponent @search="handlesListCategories"></searchComponent>
        <TableComponent>
            <!-- Header Slot -->
            <template #header>
                <th @click="changeSort('id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    STT <span v-html="getSortIcon('id')"></span>
                </th>
                <th @click="changeSort('name')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TÊN DANH MỤC<span v-html="getSortIcon('name')"></span>
                </th>
                <th @click="changeSort('image')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    ẢNH<span v-html="getSortIcon('image')"></span>
                </th>

                <th @click="changeSort('active')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                    TRẠNG THÁI<span v-html="getSortIcon('active')"></span>
                </th>
            </template>
            <!-- Body Slot -->
            <template #body>
                <tr v-for="(item, index) in listCategories" :key="index" class="hover:bg-gray-300">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {{ item.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ item.image }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <toggleButton :is-toggled="!item.active" @update:isToggled="handleActive(item.id)">
                        </toggleButton>

                    </td>
                </tr>
            </template>

            <template #footer>
                <td colspan="8"></td>
            </template>

            <template #pagination>
                <div>
                    <Pagination :total-items="pagination?.totalElements" :items-per-page="size" :current-page="page + 1"
                        @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>
        <!-- update -->
        <!-- <updateInventory v-if="idInventorySelected" :id="idInventorySelected" :isOpen="ModalUpdateInventoryIsOpen"
            @close="updateInventoryModal" @update-success="loadInventory">
        </updateInventory> -->
    </div>
</template>

<script>
import TableComponent from '../table/TableComponent.vue';
import searchComponent from '@/components/categories/searchComponent.vue';
import toggleButton from '../buttons/toggleButton.vue';
import { getCategories, changeActive } from '@/api/categoriesApi';
import Pagination from '../pagination/Pagination.vue';
export default {
    name: 'lisCategoriesComponent',
    data() {
        return {
            pagination: null,
            listCategories: [],
            page: 0,
            size: 5,
            deleted: null,
            sortField: "id",
            sortDirection: "desc",
        }
    },
    components: {
        TableComponent,
        toggleButton,
        Pagination,
        searchComponent
    },
    mounted() {
        this.handlesListCategories()
    },
    methods: {
        async handlesListCategories(keyword) {
            try {
                const param = {
                    keyword: keyword,
                    deleted: this.deleted,
                    page: this.page,
                    size: this.size,
                    sort: `${this.sortField},${this.sortDirection}`,
                }
                const res = await getCategories(param);
                this.pagination = res.data;
                this.listCategories = res.data.content;
            }
            catch (error) {
                console.log(error)
            }
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.handlesListCategories();
        },
        handleLimitChange(limitPanigation) {
            this.size = limitPanigation;
            this.page = 0;
            this.handlesListCategories();
        },
        async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
            } else {
                this.sortField = column;
                this.sortDirection = "asc";
            }
            await this.handlesListCategories();
        },
        getSortIcon(column) {
            if (this.sortField === column) {
                return this.sortDirection === "asc"
                    ? "<i class='bx bx-sort-a-z'></i>"
                    : "<i class='bx bx-sort-z-a'></i>";
            }
            return "";
        },
        async handleActive(id) {
            try {
                await changeActive(id)
                this.handlesListCategories
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>