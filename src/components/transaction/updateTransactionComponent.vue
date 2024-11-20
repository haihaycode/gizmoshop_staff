<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Đang xử lý giao dịch: {{ dataTransaction.id }}</h3>
            </template>
            <template #body>
                <div class="p-6 bg-gray-100 rounded-lg shadow">
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Tên Khách Hàng:</span>
                        <span class="text-gray-800">{{ dataTransaction.account.fullname }}</span>
                    </div>
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Tên khoản ngân hàng:</span>
                        <span class="text-gray-800">{{ dataTransaction.walletAccount.bankName }}</span>
                    </div>
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Chi nhánh ngân hàng:</span>
                        <span class="text-gray-800">{{ dataTransaction.walletAccount.branch }}</span>
                    </div>
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Số tài khoản ngân hàng:</span>
                        <span class="text-gray-800">{{ dataTransaction.walletAccount.accountNumber }}</span>
                    </div>
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Số tiền rút:</span>
                        <span class="text-gray-800">{{ dataTransaction.amount }}</span>
                    </div>
                    <div class="mb-4">
                        <span class="block font-semibold text-gray-700">Ghi chú:</span>
                        <input v-model="dataTransaction.note" class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 
                            text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            placeholder="Nhập tên danh mục" />
                    </div>
                    <div class="mt-4">
                        <span class="block font-semibold text-gray-700 mb-2">Cập nhật trạng thái:</span>
                        <select v-model="dataTransaction.status" @change="handleStatusSelect"
                            class="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled>Chọn trạng thái sản phẩm</option>
                            <option value="COMPETED">Hoàn tất</option>
                            <option value="CANCEL">Hủy bỏ</option>
                            <option value="PENDING">Đang chờ duyệt</option>
                        </select>
                    </div>
                </div>
                <div class="flex justify-end mt-5">
                    <Button @click="updateStatusTransaction" :is-Loading="isLoading" :text="'Cập nhật'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                    </Button>
                </div>
            </template>

        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import Button from '../buttons/button.vue';
import { updateStatusTransaction } from '@/api/withdrawalApi'
import notificationService from '@/services/notificationService';
export default {
    name: "updateTransactionComponent",
    data() {
        return {
            dataTransaction: {}
        }
    },
    emits: ['close', 'update-succes'],
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        slectedTransaction: {
            type: String,
            required: true,
        },
    },
    components: {
        Button, ModalBox,
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        async updateStatusTransaction() {
            try {
                const data = {
                    newStatus: this.dataTransaction.status,
                    newNote: this.dataTransaction.note
                }
                const res = await updateStatusTransaction(this.dataTransaction.id, data)
                console.log(res.data)
                notificationService.success("Cập nhật giao dịch thành công")
                this.$emit('update-succes')
            } catch (error) {
                notificationService.error("Lỗi cập nhật giao dịch")
                console.error(error)
            }
        }
    },
    watch: {
        slectedTransaction: {
            handler: async function (newTransaction) {
                this.dataTransaction = {
                    ...newTransaction
                }
                console.log(this.dataTransaction)
            },
            deep: true
        }
    }

}
</script>

<style></style>