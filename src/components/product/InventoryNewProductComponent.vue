<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
        <CardGridComponent :items="data" :loading="isLoading" :excluded-keys="['id', 'active', 'latitude', 'longitude']"
            @item-clicked="handleItemClick"></CardGridComponent>
        <div>
            <Pagination :total-items="pagination?.totalElements || 0" :items-per-page="size" :current-page="page + 1"
                @page-changed="handlePageChange" @limit-changed="handleLimitChange">
            </Pagination>
        </div>
    </div>
</template>

<script>
import { listInventory } from '@/api/inventoryApi';
import CardGridComponent from '../card/CardGridComponent.vue';
import { mapGetters } from 'vuex';
import Pagination from '../pagination/Pagination.vue';
export default {
    name: 'InventoryNewProductComponent',
    components: {
        CardGridComponent,
        Pagination
    },
    data() {
        return {
            data: null,
            pagination: [],
            sortField: 'id',
            sortDirection: 'desc',
            limit: 12,
            page: 0
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
            this.size = limitPanigation;
            this.page = 0;
            this.loadInventory();
        },
        handleItemClick(itemClicked) {
            console.log('item clicked' + itemClicked)
        }

    },
}
</script>

<style></style>