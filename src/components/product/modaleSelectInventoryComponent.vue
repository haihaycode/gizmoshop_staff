<template>
    <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading" :closeText="'Đóng'">
        <template #header>
            <h2 class="sm:text-sm md:text-lg font-bold">
                Chọn kho
            </h2>
        </template>
        <template #body>
            <div class=" text-gray-600 p-2">
                <p><span class="inline-block w-4 h-4 bg-red-500 rounded-full"></span> Kho không hoạt động</p>
                <p><span class="inline-block w-4 h-4 bg-blue-500 rounded-full"></span> Kho đang hoạt động</p>
            </div>
            <CardGridComponent class="bg-white p-2" :icon="`<i class='bx bx-git-branch  text-lg'></i>`" :items="data"
                :loading="cardLoading" :excludedKeys="['id', 'active']"
                :displayKeys="displayKeys" @item-clicked="handleItemClick"></CardGridComponent>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import CardGridComponent from '../card/CardGridComponent.vue';
import { fetchInventoryProductCounts } from '@/api/productApi'
import { mapGetters } from 'vuex';

export default {
    name: 'modaleSelectInventoryComponent',
    data() {
        return {
            cardLoading: true,
            displayKeys: {
                name: 'Tên kho',
                // city: 'Thành phố',
                // district: 'Quận/Huyện',
                // commune: 'Xã/Phường',
                active: 'Trạng thái',
                id: 'ID',
                // latitude: 'Vĩ độ',
                // longitude: 'Kinh độ',
                countProduct: 'Sản phẩm trong kho',
                countQuantityProduct: 'Tổng số lượng sản phẩm'
            },
            data: null,
        }
    },
    components: {
        ModalBox,
        CardGridComponent
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.getAllInventory()
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
    },
    emits: ['item-clicked', 'close'],
    methods: {
        async getAllInventory() {
            try {
                const res = await fetchInventoryProductCounts()
                //         {
                //     "id": 193,
                //     "name": "efgefe",
                //     "active": false,
                //     "countProduct": 4,
                //     "countQuantityProduct": 14
                // },
                this.data = res.data.map(inventory => {
                    return {
                        ...inventory,
                        name: inventory.name || 'Không có tên',
                        // city: inventory.city || 'Không có thành phố',
                        // district: inventory.district || 'Không có quận/huyện',
                        // commune: inventory.commune || 'Không có xã/phường',
                        active: inventory.active,
                        id: inventory.id,
                        // latitude: inventory.latitude || 'Không có vĩ độ',
                        // longitude: inventory.longitude || 'Không có kinh độ',
                        countProduct: inventory.countProduct,
                        countQuantityProduct: inventory.countQuantityProduct,
                    };

                },
                    this.cardLoading = false
                );
            } catch (error) {
                console.error(error)
            }
        },
        closeModal() {
            this.$emit('close');
        },
        handleItemClick(itemClicked) {
            this.$emit('item-clicked', itemClicked);
            this.$emit('close');
        },
    }

}
</script>

<style></style>