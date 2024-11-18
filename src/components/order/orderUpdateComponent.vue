<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
            <template #header>
                Cập nhật cho đơn đặt hàng: {{ dataOrder.id }} </template>
            <template #body>
                <form @submit.prevent="updateOrder">
                    <!-- Note Input -->
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="note">Ghi chú</label>
                        <textarea v-model="dataOrder.note" class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Nhập ghi chú cho đơn hàng"></textarea>
                    </div>
                    <!-- Submit Button -->
                    <div class="flex justify-end">
                        <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                        </Button>
                    </div>
                </form>
            </template>
        </ModalBox>
    </div>
</template>


<script>
import Button from '../buttons/button.vue';
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import { updateOrder } from '@/api/orderApi';
import notificationService from '@/services/notificationService';

export default {
    name: 'OrderUpdateComponent',
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
    data() {
        return {
            dataOrder: {
                id: '',
                note: '',
                idStatus: {
                    id: '',
                    name: ''
                },
            }
        };
    },
    emits: ['close', 'update-success'],
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {

    },
    components: {
        ModalBox,
        Button
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async updateOrder() {
            try {
                const payload = {
                    note: this.dataOrder.note,
                };

                await updateOrder(this.dataOrder.id, payload);
                notificationService.success("Cập nhật thành công");
                this.$emit('update-success');
                this.closeModal();
            } catch (error) {
                notificationService.error("Lỗi khi cập nhật đơn hàng");
                console.error("Lỗi khi gửi requestBody:", error);
            }
        }

    },
    watch: {
        order: {
            handler(newOrder) {
                this.dataOrder = {
                    ...newOrder,
                    id: newOrder?.id || null,
                    note: newOrder?.note || '',
                    idStatus: newOrder?.orderStatus && { id: newOrder.orderStatus.id },
                };
            },
            immediate: true,
            deep: true
        }
    }

};
</script>
