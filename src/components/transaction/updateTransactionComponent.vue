<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Đang xử lý giao dịch: {{ dataTransaction.id }}</h3>
            </template>
            <template #body>
                <div class="p-8 bg-white rounded-xl shadow-lg flex justify-between items-start">
                    <!-- Thông tin -->
                    <div class="flex-1 pr-8">
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Tên Khách Hàng:</span>
                            <span class="text-gray-600 text-base">{{ dataTransaction.account.fullname }}</span>
                        </div>
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Tên khoản ngân hàng:</span>
                            <span class="text-gray-600 text-base">{{ dataTransaction.walletAccount.bankName }}</span>
                        </div>
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Chi nhánh ngân hàng:</span>
                            <span class="text-gray-600 text-base">{{ dataTransaction.walletAccount.branch }}</span>
                        </div>
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Số tài khoản ngân hàng:</span>
                            <span class="text-gray-600 text-base">{{ dataTransaction.walletAccount.accountNumber
                                }}</span>
                        </div>
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Số tiền rút:</span>
                            <span class="text-gray-600 text-base">{{ formatCurrencyVN(dataTransaction.amount) }}</span>
                        </div>
                        <div class="mb-6">
                            <span class="block text-lg font-bold text-gray-800">Ghi chú:</span>
                            <input v-model="dataTransaction.note" :readonly="dataTransaction.status !== 'PENDING'"
                                class="border border-gray-300 rounded-lg w-2/3 py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Nhập ghi chú" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold text-gray-800 mb-2">Cập nhật trạng thái:</span>
                            <select v-model="dataTransaction.status" @change="handleStatusSelect"
                                :disabled="isHandleClick"
                                class="w-52 border border-gray-300 rounded-lg py-2 px-4 text-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value="COMPETED">Hoàn tất</option>
                                <option value="CANCEL">Hủy bỏ</option>
                                <option value="PENDING">Đang chờ duyệt</option>
                            </select>
                        </div>

                    </div>

                    <!-- QR Code -->
                    <div class="flex flex-col items-center mt-20 mr-20">
                        <div v-if="isOpenQrCode">
                            <div
                                class="w-64 h-64 flex items-center justify-center bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                                <img @error="handleImageError" :src="qrCodeImageUrl" alt="QR Code"
                                    class="w-full h-full object-contain cursor-pointer transition-transform duration-300 transform" />
                            </div>
                            <span class="text-gray-500 text-sm mt-4">Quét mã để thực hiện giao dịch</span>
                        </div>
                        <Button v-else class="mt-2" @click="ScanQRCode" :text="'Tạo Mã QR'"></Button>
                    </div>
                </div>

                <div class="flex justify-end mt-5">
                    <Button :disabled="isHandleClick" @click="updateStatusTransaction" :is-Loading="isLoading"
                        :text="'Cập nhật'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                    </Button>
                </div>

            </template>


        </ModalBox>
        <qrbankComponentVue :infoQr="dataqrCode" @succes="handleImageQR"></qrbankComponentVue>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import Button from '../buttons/button.vue';
import { updateStatusTransaction } from '@/api/withdrawalApi'
import notificationService from '@/services/notificationService';
import qrbankComponentVue from '../bank/qrbankComponent.vue';
import { formatCurrencyVN } from '@/utils/currencyUtils'

export default {
    name: "updateTransactionComponent",
    data() {
        return {
            fallbackImageUrl: require('@/assets/image/error.jpg'),
            isOpenQrCode: false,
            qrCodeImageUrl: null,
            dataqrCode: {},
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
        Button,
        ModalBox,
        qrbankComponentVue
    },
    methods: {
        handleImageError(event) {
            event.target.src = this.fallbackImageUrl; 
        },
        formatCurrencyVN,
        closeModal() {
            this.$emit('close')
            this.isOpenQrCode = false
        },

        async updateStatusTransaction() {
            try {
                const data = {
                    newStatus: this.dataTransaction.status,
                    newNote: this.dataTransaction.note
                }
                await updateStatusTransaction(this.dataTransaction.id, data)
                notificationService.success("Cập nhật giao dịch thành công")
                this.closeModal()
                this.$emit('update-succes')
            } catch (error) {
                notificationService.error("Lỗi cập nhật giao dịch")
                console.error(error)
            }
        },
        ScanQRCode() {
            const dataQR = {
                nameBank: this.dataTransaction.walletAccount.branch,
                nameAccount: this.dataTransaction.walletAccount.bankName,
                accountNo: this.dataTransaction.walletAccount.accountNumber,
                amount: this.dataTransaction.amount,
                note: this.dataTransaction.note,
            };
            this.dataqrCode = dataQR
            this.isOpenQrCode = true
        },
        handleImageQR(data) {
            console.log('Dữ liệu trả về từ API:', data);
            this.qrCodeImageUrl = data
        },
    },
    watch: {
        slectedTransaction: {
            handler: async function (newTransaction) {
                this.dataTransaction = {
                    ...newTransaction
                }
                if (this.dataTransaction.status !== 'PENDING') {
                    this.isHandleClick = true
                } else {
                    this.isHandleClick = false
                }
                console.log(this.dataTransaction)
            },
            deep: true
        }

    }

}
</script>

<style></style>