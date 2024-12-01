<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <!-- Modal Header Slot -->
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập Nhật Phiếu Giảm Giá</h3>
        </template>
        <!-- Modal Body Slot -->
        <template #body>
            <form @submit.prevent="validateForm">
                <!-- Voucher Code -->
                <div class="mb-4 ">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="code">Mã giảm giá *</label>
                    <input v-model="form.code"
                        class="shadow-none bg-yellow-300 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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

                <!-- Discount Amount -->
                <div class="mb-4" v-if="!form.discountPercent && !form.maxDiscountAmount">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="discountAmount">Số tiền giảm giá
                        *</label>
                    <input v-model="form.discountAmount"
                        class="shadow-none bg-slate-200  bg-opacity-50 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.discountAmount ? 'border-red-500' : ''" id="discountAmount"
                        placeholder="Nhập số tiền giảm giá" />
                    <p class="lg:text-sm text-red-500">{{ errors.discountAmount }}</p>
                </div>

                <!-- Discount Percent -->
                <div class="mb-4" v-if="!form.discountAmount">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="discountPercent">% Phần trăm giảm
                        *</label>
                    <input v-model="form.discountPercent"
                        class="shadow-none bg-slate-200  bg-opacity-50 border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.discountPercent ? 'border-red-500' : ''" id="discountPercent"
                        placeholder="Nhập phần trăm giảm" />
                    <p class="lg:text-sm text-red-500">{{ errors.discountPercent }}</p>
                </div>

                <!-- Max Discount Amount -->
                <div class="mb-4 " v-if="form.discountPercent">
                    <label class="block text-gray-700 text-sm font-bold mb-2 " for="maxDiscountAmount">Số
                        tiền giảm giá
                        tối đa theo phần trăm *</label>
                    <input v-model="form.maxDiscountAmount"
                        class="shadow-none border-b-2 bg-slate-200  bg-opacity-50 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.maxDiscountAmount ? 'border-red-500' : ''" id="maxDiscountAmount"
                        placeholder="Nhập số tiền giảm tối đa theo phần trăm " />
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
                </div>

                <div v-if="hasError">

                    <p class="mt-2 text-gray-500"> <i class='bx bxs-error bx-flashing bx-flip-horizontal'></i> &nbsp;
                        Không tìm
                        thấy ảnh</p>
                </div>

                <div v-else class="mt-4 w-full text-center">
                    <img :src="previewImage" @error="handleImageError" alt="không tìm thấy ảnh"
                        class="object-cover rounded-sm">
                </div>

                <!-- <img v-if="item?.image" :src="loadImageCategory(item?.image)" alt="Profile Image"
                    class="w-12 h-12 rounded-full object-cover" /> -->


                <div class="flex justify-end">
                    <Button :isLoading="isLoading" :text="'Cập Nhật'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
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
import { loadImage } from '@/services/imageService'
import { mapGetters } from 'vuex';
import * as Yup from "yup";
import { updateVoucher, changeImageVoucher } from '@/api/voucherApi'; // API for updating voucher
import NotificationModal from '../modal/NotificationModal.vue';
import Button from '../buttons/button.vue';

export default {
    name: 'UpdateVoucherComponent',
    components: {
        ModalBox,
        NotificationModal,
        Button
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        voucher: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            hasError: false,
            NotificationModalIsOpen: false,
            messageType: '',
            message: '',
            previewImage: null,
            form: {
                ...this.voucher,
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
    },
    emits: ['close', 'update-success'],
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.previewImage = loadImage(this.form.image, `voucher`);
    },
    methods: {
        loadImage,
        handleImageError() {
            this.hasError = true;
        },
        closeModal() {
            this.$emit('close');
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageUpdate = file;
                this.previewImage = URL.createObjectURL(file);
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
                const data = { ...this.form }; // Spread form data into object
                console.log(data);  // Should correctly log the form data
                const res = await updateVoucher(data); // Call API for updating voucher
                this.form = res.data
                await this.handleUpdateImageVoucher(this.form.id)
                this.message = res.message;
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;
                this.$emit('update-success');

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
