<template>
    <div class="p-2 lg:m-2 md:m-0">
        <BreadcrumbComponent :items="breadcrumbItems"></BreadcrumbComponent>
        <div class="bg-white p-2 rounded-sm">
            <h2 class="text-base sm:text-2xl md:text-3xl font-bold text-start pb-2">
                (*) Chọn kho để thêm sản phẩm
            </h2>
            <div class=" text-gray-600 p-2">
                <p><span class="inline-block w-4 h-4 bg-red-500 rounded-full"></span> Kho không hoạt động</p>
                <p><span class="inline-block w-4 h-4 bg-blue-500 rounded-full"></span> Kho đang hoạt động</p>
            </div>
            <CardGridComponent class="bg-white p-2" :icon="`<i class='bx bx-home-alt-2'></i>`" :items="data"
                :loading="isLoading" :excluded-keys="['id', 'active', 'latitude', 'longitude']"
                @item-clicked="handleItemClick">
            </CardGridComponent>
            <div>
                <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="limit"
                    :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                </Pagination>
            </div>

        </div>
    </div>

    <AddnewProductModalComponent :isOpen="modalAddNewIsOpen" :inventory="inventory" @close="modalAddNewIsOpen = false">
    </AddnewProductModalComponent>

</template>

<script>
import { listInventory } from '@/api/inventoryApi';
import CardGridComponent from '../card/CardGridComponent.vue';
import { mapGetters } from 'vuex';
import Pagination from '../pagination/Pagination.vue';
import BreadcrumbComponent from '../breadcrumb/BreadcrumbComponent.vue';
import AddnewProductModalComponent from './AddnewProductModalComponent.vue';
export default {
    name: 'InventoryNewProductComponent',
    components: {
        AddnewProductModalComponent,
        CardGridComponent,
        BreadcrumbComponent,
        Pagination
    },
    data() {
        return {
            breadcrumbItems: [
                { text: 'Trang chủ', name: 'dashboard' },
                { text: 'Quản lý sản phẩm', name: 'product' },
                { text: 'Thêm mới sản phẩm ', name: null },
            ],
            data: null,
            pagination: [],
            sortField: 'id',
            sortDirection: 'desc',
            limit: 12,
            page: 0,
            modalAddNewIsOpen: false,
            inventory: null,

        }
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    mounted() {
        this.loadInventory();
    },
    methods: {
        async loadInventory() {
            try {
                const response = await listInventory(undefined, undefined, this.page, this.limit, `${this.sortField},${this.sortDirection}`);
                this.pagination = response.data;
                this.data = response.data.content.map(item => {
                    /* eslint-disable-next-line no-unused-vars */
                    const { createdAt, updatedAt, productInventories, ...filteredItem } = item;
                    return filteredItem;
                });

                console.log(this.data)
            } catch (error) {
                console.error('Error loading inventory list:', error);
            }
        },
        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.loadInventory();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.loadInventory();
        },
        handleItemClick(itemClicked) {
            this.inventory = itemClicked;
            this.handleChangeModal();
        },
        handleChangeModal() {
            this.modalAddNewIsOpen = !this.modalAddNewIsOpen;
        }

    },
}
</script>

<style></style>