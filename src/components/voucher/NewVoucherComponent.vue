<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <!-- Modal Header Slot -->
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Thêm Phiếu Giảm Giá mới</h3>
        </template>
        <!-- Modal Body Slot -->
        <template #body>
            <form @submit.prevent="validateForm">
                <!-- Voucher Code -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="code">Mã giảm giá *</label>
                    <input v-model="form.code"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.code ? 'border-red-500' : ''" id="code" placeholder="Nhập mã giảm giá" />
                    <p class="lg:text-sm text-red-500">{{ errors.code }}</p>
                </div>

                <!-- Description -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Mô tả *</label>
                    <input v-model="form.description"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.description ? 'border-red-500' : ''" id="description" placeholder="Nhập mô tả" />
                    <p class="lg:text-sm text-red-500">{{ errors.description }}</p>
                </div>

                <!-- Loại giảm giá (Type) -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Loại giảm giá *</label>
                    <div class="flex items-center">
                        <!-- Giảm theo số tiền -->
                        <input type="radio" id="discountTypeAmount" value="amount" v-model="form.discountType"
                            class="mr-2 leading-tight" :class="errors.discountType ? 'border-red-500' : ''">
                        <label for="discountTypeAmount" class="mr-4 text-gray-700 text-sm font-medium">Giảm theo số
                            tiền</label>

                        <!-- Giảm theo phần trăm -->
                        <input type="radio" id="discountTypePercent" value="percent" v-model="form.discountType"
                            class="mr-2 leading-tight" :class="errors.discountType ? 'border-red-500' : ''">
                        <label for="discountTypePercent" class="text-gray-700 text-sm font-medium">Giảm theo phần
                            trăm</label>
                    </div>
                    <p class="lg:text-sm text-red-500">{{ errors.discountType }}</p>
                </div>


                <!-- Discount Amount -->
                <div class="mb-4" v-if="form.discountType === 'amount'">
                    <label class=" block text-gray-700 text-sm font-bold mb-2" for="discountAmount">Số tiền giảm giá
                        *</label>
                    <input v-model="form.discountAmount"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.discountAmount ? 'border-red-500' : ''" id="discountAmount"
                        placeholder="Nhập số tiền giảm giá" />
                    <p class="lg:text-sm text-red-500">{{ errors.discountAmount }}</p>
                </div>

                <!-- Discount Percent -->
                <div class="mb-4" v-if="form.discountType === 'percent'">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="discountPercent">% Phần trăm giảm
                        *</label>
                    <input v-model="form.discountPercent"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.discountPercent ? 'border-red-500' : ''" id="discountPercent"
                        placeholder="Nhập phần trăm giảm" />
                    <p class="lg:text-sm text-red-500">{{ errors.discountPercent }}</p>
                </div>

                <!-- Max Discount Amount -->
                <div class="mb-4" v-if="form.discountType === 'percent'">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="maxDiscountAmount">Số tiền giảm giá
                        tối đa theo phần trăm *</label>
                    <input v-model="form.maxDiscountAmount"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.maxDiscountAmount ? 'border-red-500' : ''" id="maxDiscountAmount"
                        placeholder="Nhập số tiền giảm tối đa" />
                    <p class="lg:text-sm text-red-500">{{ errors.maxDiscountAmount }}</p>
                </div>

                <!-- Minimum Order Value -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="minimumOrderValue">Giá trị đơn hàng
                        tối thiểu *</label>
                    <input v-model="form.minimumOrderValue"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.minimumOrderValue ? 'border-red-500' : ''" id="minimumOrderValue"
                        placeholder="Nhập giá trị đơn hàng tối thiểu" />
                    <p class="lg:text-sm text-red-500">{{ errors.minimumOrderValue }}</p>
                </div>

                <!-- Valid From -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="validFrom">Ngày bắt đầu *</label>
                    <input type="datetime-local" v-model="form.validFrom"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.validFrom ? 'border-red-500' : ''" id="validFrom" />
                    <p class="lg:text-sm text-red-500">{{ errors.validFrom }}</p>
                </div>

                <!-- Valid To -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="validTo">Ngày kết thúc *</label>
                    <input type="datetime-local" v-model="form.validTo"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.validTo ? 'border-red-500' : ''" id="validTo" />
                    <p class="lg:text-sm text-red-500">{{ errors.validTo }}</p>
                </div>

                <!-- Usage Limit -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="usageLimit">Giới hạn sử dụng
                        *</label>
                    <input v-model="form.usageLimit"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.usageLimit ? 'border-red-500' : ''" id="usageLimit"
                        placeholder="Nhập giới hạn sử dụng" />
                    <p class="lg:text-sm text-red-500">{{ errors.usageLimit }}</p>
                </div>

                <!-- Used Count -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="usedCount">Số lần đã sử dụng</label>
                    <input v-model="form.usedCount"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.usedCount ? 'border-red-500' : ''" id="usedCount"
                        placeholder="Nhập số lần đã sử dụng" />
                    <p class="lg:text-sm text-red-500">{{ errors.usedCount }}</p>
                </div>

                <!-- Status -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Trạng thái *</label>
                    <select v-model="form.status"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.status ? 'border-red-500' : ''" id="status">
                        <option value=true>Hoạt động</option>
                        <option value=false>Ngừng hoạt động</option>
                    </select>
                    <p class="lg:text-sm text-red-500">{{ errors.status }}</p>
                </div>


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Hình ảnh *</label>
                    <input type="file" @change="handleFileUpload" id="image" accept="image/*"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="form.image ? 'border-red-500' : ''" />
                    <p class="lg:text-sm text-red-500">{{ errors.image }}</p>
                </div>

                <div class="flex justify-end">
                    <Button :isLoading="isLoading" :text="'Lưu'" type="submit"
                        class="px-4 py-2 text-white rounded-sm hover:bg-[#2a2eaed7]">
                    </Button>
                </div>
            </form>
        </template>
    </ModalBox>

    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
        @close="NotificationModalIsOpen = false" :title="'Thông báo'"></NotificationModal>
</template>


<script>
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import * as Yup from "yup";
import { createVoucher, changeImageVoucher } from '@/api/voucherApi';
import NotificationModal from '../modal/NotificationModal.vue';
import Button from '../buttons/button.vue';

export default {
    name: 'NewVoucherComponent',
    components: {
        ModalBox,
        NotificationModal,
        Button
    },
    data() {
        return {
            NotificationModalIsOpen: false,
            messageType: '',
            message: '',
            imageUpdate: '',
            form: {
                code: '',               // Mã giảm giá
                description: '',        // Mô tả
                discountType: 'amount', // Loại giảm giá (số tiền/phần trăm)
                discountAmount: 0,      // Số tiền giảm giá
                discountPercent: 0,     // Phần trăm giảm
                maxDiscountAmount: 0,   // Số tiền giảm giá tối đa cho phần trăm
                minimumOrderValue: '',   // Giá trị đơn hàng tối thiểu
                validFrom: '',           // Ngày bắt đầu
                validTo: '',             // Ngày kết thúc
                usageLimit: '',          // Giới hạn sử dụng
                usedCount: '',           // Số lần đã sử dụng
                status: true,            // Trạng thái hoạt động

            },
            errors: {
                code: '',
                description: '',
                discountAmount: '',
                discountPercent: '',
                maxDiscountAmount: '',
                minimumOrderValue: '',
                validFrom: '',
                validTo: '',
                usageLimit: '',
                usedCount: '',
                status: ''
            }
        };
    }
    ,
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageUpdate = file;
                const reader = new FileReader();
                reader.readAsDataURL(file);
            }
        },
        validateForm() {

            this.errors = {};

            const schema = Yup.object().shape({
                code: Yup.string()
                    .required('Mã giảm giá là bắt buộc')
                    .min(2, 'Mã giảm giá phải có ít nhất 2 ký tự')
                    .max(100, 'Mã giảm giá không được vượt quá 100 ký tự'),

                description: Yup.string()
                    .required('Mô tả là bắt buộc')
                    .min(5, 'Mô tả phải có ít nhất 5 ký tự')
                    .max(200, 'Mô tả không được vượt quá 200 ký tự'),

                discountAmount: Yup.number()
                    .typeError('Số tiền giảm giá phải là số')
                    .required('Số tiền giảm giá là bắt buộc')
                    .min(0, 'Số tiền giảm giá phải lớn hơn hoặc bằng 0'),

                discountPercent: Yup.number()
                    .typeError('Số phần trăm giảm giá phải là số')
                    .required('Phần trăm giảm là bắt buộc')
                    .min(0, 'Phần trăm giảm phải lớn hơn hoặc bằng 0')
                    .max(100, 'Phần trăm giảm không được vượt quá 100%'),

                maxDiscountAmount: Yup.number()
                    .typeError('Số tiền giảm giá tối đa phải là số')
                    .required('Số tiền giảm tối đa là bắt buộc')
                    .min(0, 'Số tiền giảm tối đa phải lớn hơn hoặc bằng 0'),

                minimumOrderValue: Yup.number()
                    .typeError('Số tiền giảm giá tối thiểu phải là số')
                    .required('Giá trị đơn hàng tối thiểu là bắt buộc')
                    .min(0, 'Giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 0'),

                validFrom: Yup.date()
                    .required('Ngày bắt đầu là bắt buộc')
                    .typeError('Ngày bắt đầu không hợp lệ'),

                validTo: Yup.date()
                    .required('Ngày kết thúc là bắt buộc')
                    .min(Yup.ref('validFrom'), 'Ngày kết thúc phải sau ngày bắt đầu')
                    .typeError('Ngày kết thúc không hợp lệ'),

                usageLimit: Yup.number()
                    .typeError('Phải là số')
                    .required('Giới hạn sử dụng là bắt buộc')
                    .min(0, 'Giới hạn sử dụng phải lớn hơn hoặc bằng 0'),

                usedCount: Yup.number()
                    .typeError('Phải là số')
                    .min(0, 'Số lần đã sử dụng phải lớn hơn hoặc bằng 0'),

                status: Yup.boolean()
                    .required('Trạng thái là bắt buộc'),
            });

            schema.validate(this.form, { abortEarly: false })
                .then(() => {
                    this.submitForm();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },

        async submitForm() {
            try {
                const data = { ...this.form };
                console.log(data);
                const res = await createVoucher(data);
                this.form = res.data
                await this.handleUpdateImageVoucher(this.form.id)

                this.message = res.message;
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;
                this.$emit('create-success');

            } catch (error) {
                this.message = error.message;
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        },
        async handleUpdateImageVoucher(id) {
            try {
                const formData = new FormData();
                if (this.imageUpdate) {
                    formData.append('file', this.imageUpdate);
                }
                await changeImageVoucher(id, formData);
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style scoped>
/* Custom styles for removing borders except for the bottom */
input {
    border: none;
    border-bottom: 2px solid #ddd;
}

input:focus {
    outline: none;
    border-bottom-color: #3b82f6;
    /* Blue border on focus */
}
</style>