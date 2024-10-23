<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">

        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật danh mục ID: {{ dataCategory.id }}</h3>
        </template>

        <template #body>
            <form @submit.prevent="validateForm">

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="inventoryName">Tên danh mục *</label>
                    <input v-model="dataCategory.name"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.name ? 'border-red-500' : ''" id="inventoryName"
                        placeholder="Nhập tên danh mục" />
                    <p class="lg:text-sm text-red-500">{{ errors.name }}</p>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="active">Hoạt động *</label>
                    <select v-model="dataCategory.active"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.active ? 'border-red-500' : ''" id="active">
                        <option value=true>Hoạt động</option>
                        <option value=false>Ngừng hoạt động</option>
                    </select>
                    <p class="lg:text-sm text-red-500">{{ errors.active }}</p>
                </div>



                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Hình ảnh *</label>
                    <input type="file" @change="handleFileUpload" id="image" accept="image/*"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="dataCategory.image ? 'border-red-500' : ''" />
                    <p class="lg:text-sm text-red-500">{{ errors.image }}</p>
                </div>



                <div class="flex justify-end">
                    <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
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
import { mapGetters } from 'vuex';
import { updateInfoCategory, getCategoriesID, updateImageCategory } from '@/api/categoriesApi.js';
import NotificationModal from '../modal/NotificationModal.vue';
import Button from '../buttons/button.vue';
import * as Yup from "yup";

export default {
    name: 'updateCtegories',
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
            dataCategory: {},
            errors: {},
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        idSelected: {
            type: String,
            required: true,
        },
        // getInfo: Function
    },
    mounted() {
        this.getCategoriesId()
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
        async getCategoriesId() {
            try {
                const res = await getCategoriesID(this.idSelected);
                this.dataCategory = res.data;
                this.imageUpdate = this.dataCategory.image
            } catch (error) {
                this.message = 'không thể lấy dữ liệu của danh mục này';
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        },
        validateForm() {
            this.errors = {};
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Tên danh mục là bắt buộc')
                    .min(2, 'Tên danh mục phải có ít nhất 2 ký tự')
                    .max(100, 'Tên danh mục không được vượt quá 100 ký tự')
            });
            schema.validate(this.dataCategory, { abortEarly: false })
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
                const data = {
                    name: this.dataCategory.name,
                    active: this.dataCategory.active,
                };

                const res = await updateInfoCategory(this.idSelected, data);
                await this.handleUpdateCategory(this.idSelected)

                this.getCategoriesId()

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
        async handleUpdateCategory(id) {
            try {
                const formData = new FormData();
                if (this.imageUpdate) {
                    formData.append('file', this.imageUpdate);
                }
               await updateImageCategory(id, formData);
            } catch (error) {
                console.log(error)
            }
        },
        

    }
}

</script>
