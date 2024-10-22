<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">

        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Thêm danh mục</h3>
        </template>

        <template #body>
            <form @submit.prevent="validateForm">

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="inventoryName">Tên danh mục *</label>
                    <input v-model="form.categoryName"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.categoryName ? 'border-red-500' : ''" id="inventoryName"
                        placeholder="Nhập tên danh mục" />
                    <p class="lg:text-sm text-red-500">{{ errors.categoryName }}</p>
                </div>

                <!-- <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">Kinh độ *</label>
                    <input v-model="form.longitude"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.longitude ? 'border-red-500' : ''" id="longitude" placeholder="Nhập kinh độ" />
                    <p class="lg:text-sm text-red-500">{{ errors.longitude }}</p>
                </div> -->


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="active">Hoạt động *</label>
                    <select v-model="form.active"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.active ? 'border-red-500' : ''" id="active">
                        <option value=true>Hoạt động</option>
                        <option value=false>Ngừng hoạt động</option>
                    </select>
                    <p class="lg:text-sm text-red-500">{{ errors.active }}</p>
                </div>

                <div class="flex justify-end">
                    <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-[#2a2eaed7]">
                    </Button>
                </div>
            </form>
        </template>
    </ModalBox>

    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
        @close="NotificationModalIsOpen" :title="'Thông báo'"></NotificationModal>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import { createCategory } from '@/api/categoriesApi.js'
import NotificationModal from '../modal/NotificationModal.vue';
import Button from '../buttons/button.vue';
import * as Yup from "yup";
export default {
    name: 'createCategory',
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
            form: {
                categoryName: '',
                image: '',
                active: true,
            },
            errors: {
                categoryName: ''
            }
        };
    }, computed: {
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
        validateForm() {
            this.errors = {};
            const schema = Yup.object().shape({
                categoryName: Yup.string()
                    .required('Tên danh mục là bắt buộc')
                    .min(2, 'Tên danh mục phải có ít nhất 2 ký tự')
                    .max(100, 'Tên danh mục không được vượt quá 100 ký tự'),

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
                console.log("lỗi dòng 117")
                const data = { ...this.form };
                const res = await createCategory(data);
                this.message = res.message;
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;
                this.$emit('create-success');

            } catch (error) {
                this.message = error.message;
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        }
    }

}
</script>

<style></style>