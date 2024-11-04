<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Chọn Thương Hiệu </h3>
        </template>
        <template #body>
            <div class=" text-gray-600 p-2">
                <p><span class="inline-block w-4 h-4 bg-red-500 rounded-full"></span> Thương Hiệu không hoạt động</p>
                <p><span class="inline-block w-4 h-4 bg-blue-500 rounded-full"></span> Thương Hiệu đang hoạt động</p>
            </div>
            <CardGridComponent class="bg-white p-2" :icon="`<i class='bx bx-git-branch  text-lg'></i>`" :items="data"
                :loading="isLoading" :excluded-keys="['id', 'active', 'latitude', 'longitude']"
                :displayKeys="displayKeys" @item-clicked="handleItemClick"></CardGridComponent>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { fetchBrandProductCounts } from '@/api/brandApi';
import CardGridComponent from '../card/CardGridComponent.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'modalSelectBrandComponent',
    components: {
        ModalBox,
        CardGridComponent
    },
    emits: ['item-clicked']['close'],
    data() {
        return {
            data: null,
            categorySelected: null,
            displayKeys: {
                id: 'Mã Thương Hiệu',
                active: 'Trạng thái',
                name: 'Tên Thương Hiệu',
                quantity: 'Tổng mặt hàng ',
                quantityActive: 'Mặt hàng hoạt động',
            }
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },

    },
    mounted() {
        this.loadData();
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    methods: {
        async loadData() {
            try {
                const res = await fetchBrandProductCounts();
                this.data = res.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        closeModal() {
            this.$emit('close');
        },
        handleItemClick(itemClicked) {
            this.$emit('itemClicked', itemClicked);
            this.$emit('close');
        },
    }
}
</script>

<style></style>