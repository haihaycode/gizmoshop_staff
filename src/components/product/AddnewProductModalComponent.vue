<template>
    <div>
        <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Thêm sản phẩm vào kho <span class="text-blue-500">{{
                    inventory?.inventoryName }}</span></h3>
            </template>

            <template #body>
                <form @submit.prevent="validateForm">

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Tên sản phẩm
                            *</label>
                        <input v-model="form.productName"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productName ? 'border-red-500' : ''" id="productName"
                            placeholder="Nhập tên sản phẩm" />
                        <p class="lg:text-sm text-red-500">{{ errors.productName }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Trạng thái sản phẩm
                            *</label>
                        <select class="border-b-2 w-full" v-model="form.productStatus.id" @change="handleStatusSelect">
                            <option value="" disabled>Chọn trạng thái sản phẩm</option>
                            <option v-for="status in listStatus" :key="status.id" :value="status.id">
                                {{ status.name }}
                            </option>
                        </select>
                        <p class="lg:text-sm text-red-500">{{ errors.productStatus?.id }}</p>
                    </div>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productCategory">Danh mục
                            *</label>
                        <input v-model="form.productCategory.name" @click="modalSelectCategoryComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            :class="errors.productCategory ? 'border-red-500' : ''" id="productCategory"
                            placeholder="Chọn danh mục" readonly />
                        <span v-if="form.productCategory.name" @click="form.productCategory = { id: '', name: '' }"
                            class="absolute right-2 top-2 cursor-pointer">
                            <i class="bx bx-x text-2xl"></i>
                        </span>
                        <p class="lg:text-sm text-red-500">{{ errors.productCategory?.id }}</p>
                    </div>


                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productCategory">Thương hiệu
                            *</label>
                        <input v-model="form.productBrand.name" @click="modalSelectBrandComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            :class="errors.productBrand ? 'border-red-500' : ''" id="productCategory"
                            placeholder="Chọn danh mục" readonly />
                        <span v-if="form.productBrand.name" @click="form.productBrand = { id: '', name: '' }"
                            class="absolute right-2 top-2 cursor-pointer">
                            <i class="bx bx-x text-2xl"></i>
                        </span>
                        <p class="lg:text-sm text-red-500">{{ errors.productBrand?.id }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Giá Gốc sản phẩm
                            *</label>
                        <input type="number" v-model="form.productPrice"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productPrice ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" />
                        <p class="lg:text-sm text-red-500">{{ errors.productPrice }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Số lượng sản phẩm
                            *</label>
                        <input type="number" v-model="form.productQuantity"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productQuantity ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" />
                        <p class="lg:text-sm text-red-500">{{ errors.productQuantity }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discountProduct">Giảm giá (%)
                            *</label>
                        <input type="number" v-model="form.discountProduct"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.discountProduct ? 'border-red-500' : ''" id="discountProduct"
                            placeholder="Nhập tỷ lệ giảm giá sản phẩm (%)" />
                        <p class="lg:text-sm text-red-500">{{ errors.discountProduct }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWeight">Khối lượng
                            *</label>
                        <input type="number" v-model="form.productWeight"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWeight ? 'border-red-500' : ''" id="productWeight"
                            placeholder="Nhập khối lượng sản phẩm (kg)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productWeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productArea">Diện tích *</label>
                        <input type="number" v-model="form.productArea"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productArea ? 'border-red-500' : ''" id="productArea"
                            placeholder="Nhập diện tích sản phẩm (m²)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productArea }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productVolume">Thể tích *</label>
                        <input type="number" v-model="form.productVolume"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productVolume ? 'border-red-500' : ''" id="productVolume"
                            placeholder="Nhập thể tích sản phẩm (m³)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productVolume }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWidth">Chiều rộng
                            *</label>
                        <input type="number" v-model="form.productWidth"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWidth ? 'border-red-500' : ''" id="productWidth"
                            placeholder="Nhập chiều rộng sản phẩm (cm)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productWidth }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productHeight">Chiều cao
                            *</label>
                        <input type="number" v-model="form.productHeight"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productHeight ? 'border-red-500' : ''" id="productHeight"
                            placeholder="Nhập chiều cao sản phẩm (cm)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productHeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productLength">Chiều dài
                            *</label>
                        <input type="number" v-model="form.productLength"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productLength ? 'border-red-500' : ''" id="productLength"
                            placeholder="Nhập chiều dài sản phẩm (cm)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productLength }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productShortDescription">Mô tả
                            ngắn *</label>
                        <textarea v-model="form.productShortDescription"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productShortDescription ? 'border-red-500' : ''" id="productShortDescription"
                            placeholder="Nhập mô tả ngắn sản phẩm"></textarea>
                        <p class="lg:text-sm text-red-500">{{ errors.productShortDescription }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productLongDescription">Mô tả dài
                            *</label>
                        <ckeditor v-model="form.productLongDescription" :editor="editor" @ready="onEditorReady"
                            @change="onEditorChange">
                        </ckeditor>
                        <p class="lg:text-sm text-red-500">{{ errors.productLongDescription }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="">Chọn hình cho sản phẩm</label>
                        <uploadImageComponent @update-images="handleSelectImages"></uploadImageComponent>
                    </div>

                    <div class="flex justify-end">
                        <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                        </Button>
                    </div>
                </form>
            </template>
        </ModalBox>
    </div>

    <!-- modalSelectCategoryComponent  -->
    <modalSelectCategoryComponent :isOpen="modalSelectCategoryComponentIsOpen"
        @close="modalSelectCategoryComponentIsOpen = false"
        @itemClicked="(item) => { form.productCategory = { id: item.id, name: item.name } }">
    </modalSelectCategoryComponent>

    <modalSelectBrandComponent :isOpen="modalSelectBrandComponentIsOpen"
        @close="modalSelectBrandComponentIsOpen = false"
        @itemClicked="(item) => { form.productBrand = { id: item.id, name: item.name } }">
    </modalSelectBrandComponent>

</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import modalSelectCategoryComponent from './modalSelectCategoryComponent.vue';
import modalSelectBrandComponent from './modalSelectBrandComponent.vue';
import uploadImageComponent from '../image/uploadImageComponent.vue';
import { mapGetters } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '@/utils/myUploadAdapter';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import Button from '../buttons/button.vue';
import * as Yup from "yup";
import notificationService from '@/services/notificationService';
import { createProduct, getStatusProduct, updataImage } from '@/api/productApi'

export default {
    name: 'addNewProductComponent',
    components: {
        ModalBox,
        ckeditor: Ckeditor,
        Button,
        modalSelectCategoryComponent,
        modalSelectBrandComponent,
        uploadImageComponent
    },
    emits: ['create-success', 'close'],
    data() {
        return {
            modalSelectCategoryComponentIsOpen: false,
            modalSelectBrandComponentIsOpen: false,
            messageType: '',
            message: '',
            resProductData: {},
            listStatus: [],
            form: {
                productName: '',
                productPrice: 0,
                discountProduct: 0,
                thumbnail: '',
                productLongDescription: '',
                productShortDescription: '',
                productWeight: 0,
                productArea: 0,
                productVolume: 0,
                productWidth: 0,
                productHeight: 0,
                productLength: 0,
                inventoryId: '',
                productQuantity: 0,
                selectedImages: [],
                productCategory: {
                    id: '',
                    name: ''
                },
                productBrand: {
                    id: '',
                    name: ''
                },
                productStatus: {
                    id: '',
                    name: ''
                }

            },
            errors: {},
            editor: ClassicEditor
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
        inventory: {
            type: Object,
            required: false
        },
    },
    mounted() {
        this.getListStatus();
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        onEditorChange(event, editor) {
            this.form.productLongDescription = editor.getData();
        },
        onEditorReady(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new MyUploadAdapter(loader);
            };
            editor.ui.view.editable.element.style.height = '300px';
            editor.ui.view.editable.element.style.minHeight = '200px';
            editor.ui.view.editable.element.style.overflowY = 'auto';

        },
        validateForm() {
            this.errors = {};
            const schema = Yup.object().shape({
                productName: Yup.string().required('Tên sản phẩm là bắt buộc').min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự'),
                productPrice: Yup.number().required('Giá sản phẩm là bắt buộc'),
                productQuantity: Yup.number().required('Số lượng sản phẩm là bắt buộc'),
                discountProduct: Yup.number().min(0, 'Giảm giá phải lớn hơn hoặc bằng 0'),
                productWeight: Yup.number().required('Khối lượng sản phẩm là bắt buộc'),
                productArea: Yup.number().required('Diện tích sản phẩm là bắt buộc'),
                productVolume: Yup.number().required('Thể tích sản phẩm là bắt buộc'),
                productWidth: Yup.number().required('Chiều rộng sản phẩm là bắt buộc'),
                productHeight: Yup.number().required('Chiều cao sản phẩm là bắt buộc'),
                productLength: Yup.number().required('Chiều dài sản phẩm là bắt buộc'),
                productCategory: Yup.object().shape({
                    id: Yup.string().required('Danh mục là bắt buộc'),
                }).required('Danh mục là bắt buộc'),
                productBrand: Yup.object().shape({
                    id: Yup.string().required('Thương hiệu là bắt buộc'),
                }).required('Thương hiệu là bắt buộc'),
                productStatus: Yup.object().shape({
                    id: Yup.string().required('Trạng thái sản phẩm là bắt buộc'),
                }).required('Trạng thái sản phẩm là bắt buộc'),
                productLongDescription: Yup.string().required('Mô tả dài là bắt buộc')
            });
            schema.validate(this.form, { abortEarly: false })
                .then(() => {
                    this.submitForm();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        if (validationError.path.startsWith('productCategory.')) {
                            // Xử lý lỗi cho productCategory
                            const key = validationError.path.split('.')[1]; // Lấy tên thuộc tính bên trong productCategory
                            this.errors.productCategory = this.errors.productCategory || {};
                            this.errors.productCategory[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else if (validationError.path.startsWith('productBrand.')) {
                            // Xử lý lỗi cho productBrand
                            const key = validationError.path.split('.')[1]; // Lấy tên thuộc tính bên trong productBrand
                            this.errors.productBrand = this.errors.productBrand || {};
                            this.errors.productBrand[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else if (validationError.path.startsWith('productStatus.')) {
                            const key = validationError.path.split('.')[1];
                            this.errors.productStatus = this.errors.productStatus || {};
                            this.errors.productStatus[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else {
                            // Xử lý lỗi cho các trường khác
                            this.errors[validationError.path] = validationError.message;
                            notificationService.warning(validationError.message);
                        }

                    });
                });
        },
        handleSelectImages(images) {
            this.form.selectedImages = images;
        },

        async getListStatus() {
            try {
                const res = await getStatusProduct();
                this.listStatus = res.data
            } catch (error) {
                console.error(error)
            }
        },
        handleStatusSelect() {
            const selectedStatus = this.listStatus.find(status => status.id === this.form.productStatus.id);
            this.form.productStatus = selectedStatus ? { id: selectedStatus.id, name: selectedStatus.name } : { id: '', name: '' };
            console.log(this.form.productStatus)
        },
        async submitForm() {
            try {
                this.addNewProduct(this.form)
            } catch (error) {
                console.error(error)
            }
        },

        async addNewProduct(data) {
            try {
                const productNew = {
                    productName: data.productName,
                    thumbnail: data.thumbnail,
                    productCategoryId: data.productCategory.id,
                    productPrice: data.productPrice,
                    discountProduct: data.discountProduct,
                    productLongDescription: data.productLongDescription,
                    productWeight: data.productWeight,
                    productArea: data.productArea,
                    productVolume: data.productVolume,
                    productHeight: data.productHeight,
                    productLength: data.productLength,
                    productBrandId: data.productBrand.id,
                    inventoryId: this.inventory?.id,
                    quantity: data.productQuantity,
                    productStatusResponseId: data.productStatus.id,
                    width: data.productWidth
                };
                const res = await createProduct(productNew);
                // Kiểm tra kết quả trả về từ createProduct
                console.log("createProduct response:", res);

                if (data.selectedImages && data.selectedImages.length > 0) {
                    console.log("có dữ liệu ảnh")
                    const dataUpdateImage = {
                        productId: res.data.id,
                        files: data.selectedImages
                    };

                    console.log("Data gửi vào addImageProduct:", dataUpdateImage);
                    await this.addImageProduct(dataUpdateImage);
                }
            } catch (error) {
                console.error(error)
            }
        },

        async addImageProduct(data) {
            try {
                const formData = new FormData();
                formData.append("productId", data.productId);
                data.files.forEach(file => {
                    formData.append("files", file);
                });

                const res = await updataImage(formData);

                console.log("gửi thành công", res);
            } catch (error) {
                console.error(error);
            }
        }
    },

}

</script>

<style></style>
