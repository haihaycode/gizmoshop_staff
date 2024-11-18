<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
            <template #header>
                <h1 class="sm:text-sm md:text-lg font-bold">Cập nhật thông tin cho sản phẩm ID: <span
                        class="text-blue-500">{{ form?.id }}</span></h1>
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

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productInventoryResponse">
                            Sản phẩm đang thuộc kho *
                        </label>
                        <input v-model="form.productInventoryResponse.name"
                            @click="modalSelectInventoryComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            id="productInventoryResponse" placeholder="Chọn kho mới" readonly />
                        <span v-if="form.productInventoryResponse.name"
                            @click="form.productInventoryResponse = { id: '', name: '' }"
                            class="absolute right-2 top-2 cursor-pointer">
                            <i class="bx bx-x text-2xl"></i>
                        </span>
                        <p class="lg:text-sm text-red-500">{{ errors.productInventoryResponse?.id }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Trạng thái sản phẩm
                            *</label>
                        <select class="border-b-2 w-full" v-model="form.productStatusResponse.id"
                            @change="handleStatusSelect">
                            <option value="" disabled>Chọn trạng thái sản phẩm</option>
                            <option v-for="status in listStatus" :key="status.id" :value="status.id">
                                {{ status.name }}
                            </option>
                        </select>
                        <p class="lg:text-sm text-red-500">{{ errors.productStatusResponse?.id }}</p>
                    </div>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productCategory">Danh mục
                            *</label>
                        <input v-model="form.productCategories.name" @click="modalSelectCategoryComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            id="productCategory" placeholder="Chọn danh mục" readonly />
                        <span v-if="form.productCategories.name" @click="form.productCategories = { id: '', name: '' }"
                            class="absolute right-2 top-2 cursor-pointer">
                            <i class="bx bx-x text-2xl"></i>
                        </span>
                        <p class="lg:text-sm text-red-500">{{ errors.productCategories?.id }}</p>
                    </div>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productCategory">Thương hiệu
                            *</label>
                        <input v-model="form.productBrand.name" @click="modalSelectBrandComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            id="productCategory" placeholder="Chọn danh mục" readonly />
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
                            @blur="form.productHeight = form.productHeight ? form.productHeight : 0"
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
                        <uploadImageComponent :listImages="listImagePreview" @update-images="handleSelectImages"
                            @update-prod="loadProp">
                        </uploadImageComponent>
                    </div>

                    <div class="flex justify-end">
                        <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                        </Button>
                    </div>
                </form>
            </template>
        </ModalBox>

        <!-- modalSelectCategoryComponent  -->
        <modalSelectCategoryComponent :isOpen="modalSelectCategoryComponentIsOpen"
            @close="modalSelectCategoryComponentIsOpen = false"
            @itemClicked="(item) => { form.productCategory = { id: item.id, name: item.name } }">
        </modalSelectCategoryComponent>

        <modalSelectBrandComponent :isOpen="modalSelectBrandComponentIsOpen"
            @close="modalSelectBrandComponentIsOpen = false"
            @itemClicked="(item) => { form.productBrand = { id: item.id, name: item.name } }">
        </modalSelectBrandComponent>

        <modaleSelectInventoryComponent :isOpen="modalSelectInventoryComponentIsOpen"
            @close="modalSelectInventoryComponentIsOpen = false"
            @item-clicked="(item) => { form.productInventoryResponse = { id: item.id, name: item.name } }">
        </modaleSelectInventoryComponent>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import MyUploadAdapter from '@/utils/myUploadAdapter';
import notificationService from '@/services/notificationService';
import * as Yup from "yup";
import { mapGetters } from 'vuex';
import Button from '../buttons/button.vue';
import uploadImageComponent from '../image/uploadImageComponent.vue';
import { getStatusProduct, updateProduct, updataImage } from '@/api/productApi'
import modalSelectCategoryComponent from './modalSelectCategoryComponent.vue';
import modalSelectBrandComponent from './modalSelectBrandComponent.vue';
import modaleSelectInventoryComponent from './modaleSelectInventoryComponent.vue';
import { loadImage } from "@/services/imageService";

export default {
    name: 'updateProductComponent',
    data() {
        return {
            modalSelectInventoryComponentIsOpen: false,
            modalSelectCategoryComponentIsOpen: false,
            modalSelectBrandComponentIsOpen: false,
            listStatus: [],
            message: '',
            listImagePreview: [],
            form: {
                id: '',
                productName: '',
                productPrice: 0,
                discountProduct: '',
                thumbnail: '',
                productLongDescription: '',
                productShortDescription: '',
                productWeight: 0,
                productArea: '',
                productVolume: 0,
                productWidth: 0,
                productHeight: 0,
                productLength: 0,
                inventoryId: '',
                productQuantity: '',
                selectedImages: [],
                productStatusResponse: {
                    id: '',
                    name: ''
                },
                productBrand: {
                    id: '',
                    name: ''
                },
                productCategories: {
                    id: '',
                    name: ''
                },
                productInventoryResponse: {
                    id: '',
                    name: ''
                }
            },
            errors: {},
            editor: ClassicEditor
        }
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
        imageList() {
            return this.productSelected?.productImageMappingResponse?.flatMap(mapping =>
                mapping.image.map(img => img.fileDownloadUri)
            ) || [];
        },
    },

    mounted() {
        this.getListStatus();
    },

    components: {
        ModalBox,
        Button,
        uploadImageComponent,
        modalSelectCategoryComponent,
        modalSelectBrandComponent,
        modaleSelectInventoryComponent,
        ckeditor: Ckeditor,

    },
    emits: ['close', 'update-success'],
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        productSelected: {
            type: Object,
            required: false
        }
    },
    methods: {
        loadImage,
        async processImages(imageMappings) {
            const promises = imageMappings.flatMap(mapping => {
                if (!mapping.image) return [];
                return mapping.image.map(async img => {
                    try {
                        const imageUrl = loadImage(img.fileDownloadUri, 'product');
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const fileName = img.fileDownloadUri.split('/').pop();
                        const file = new File([blob], fileName, { type: blob.type });
                        this.listImagePreview.push(file);
                    } catch (error) {
                        console.error('Lỗi tải ảnh:', error);
                    }
                });
            });
            await Promise.all(promises);
        },

        closeModal() {
            this.$emit('close');
        },

        getImageUrl(file) {
            if (file && file.type.startsWith('image/')) {
                return URL.createObjectURL(file);
            }
            return 'không phải ảnh';
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
                productCategories: Yup.object().shape({
                    id: Yup.string().required('Danh mục là bắt buộc'),
                }),
                productBrand: Yup.object().shape({
                    id: Yup.string().required('Thương hiệu là bắt buộc'),
                }),
                productStatusResponse: Yup.object().shape({
                    id: Yup.string().required('Trạng thái sản phẩm là bắt buộc'),
                }),
                productInventoryResponse: Yup.object().shape({
                    id: Yup.string().required('Sản phẩm là bắt buộc phải có kho'),
                }),
                productLongDescription: Yup.string().required('Mô tả dài là bắt buộc')
            });
            schema.validate(this.form, { abortEarly: false })
                .then(() => {
                    this.submitForm();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        if (validationError.path.startsWith('productCategories.')) {
                            const key = validationError.path.split('.')[1];
                            this.errors.productCategories = this.errors.productCategories || {};
                            this.errors.productCategories[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else if (validationError.path.startsWith('productBrand.')) {
                            const key = validationError.path.split('.')[1];
                            this.errors.productBrand = this.errors.productBrand || {};
                            this.errors.productBrand[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else if (validationError.path.startsWith('productStatusResponse.')) {
                            const key = validationError.path.split('.')[1];
                            this.errors.productStatusResponse = this.errors.productStatusResponse || {};
                            this.errors.productStatusResponse[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else if (validationError.path.startsWith('productInventoryResponse.')) {
                            const key = validationError.path.split('.')[1];
                            this.errors.productInventoryResponse = this.errors.productInventoryResponse || {};
                            this.errors.productInventoryResponse[key] = validationError.message;

                            notificationService.warning(validationError.message);
                        } else {
                            this.errors[validationError.path] = validationError.message;
                            notificationService.warning(validationError.message);
                        }

                    });
                });
        },
        async getListStatus() {
            try {
                const res = await getStatusProduct();
                this.listStatus = res.data
            } catch (error) {
                console.error(error)
            }
        },
        handleSelectImages(images) {
            this.form.selectedImages = images;
        },
        onEditorChange(editor) {
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
        async submitForm() {
            try {
                this.update()
            } catch (error) {
                console.error(error)
            }
        },
        async update() {
            try {
                const data = {
                    productName: this.form.productName,
                    thumbnail: this.form.thumbnail,
                    productCategoryId: this.form.productCategories?.id,
                    productPrice: this.form.productPrice,
                    discountProduct: this.form.discountProduct,
                    productShortDescription: this.form.productShortDescription,
                    productLongDescription: this.form.productLongDescription,
                    productWeight: this.form.productWeight,
                    productArea: this.form.productArea,
                    productVolume: this.form.productVolume,
                    productHeight: this.form.productHeight,
                    productLength: this.form.productLength,
                    productBrandId: this.form.productBrand?.id,
                    inventoryId: this.form.productInventoryResponse?.id,
                    quantity: this.form.productQuantity,
                    productStatusResponseId: this.form.productStatusResponse?.id,
                    width: this.form.productWidth
                }
                console.log(data)
                const res = await updateProduct(this.form.id, data)
                if (this.form.selectedImages && this.form.selectedImages.length > 0) {
                    const dataUpdateImage = {
                        productId: res.data.id,
                        files: this.form.selectedImages
                    };
                    console.log("Data gửi vào addImageProduct:", dataUpdateImage);
                    await this.addImageProduct(dataUpdateImage);
                }
                this.$emit('update-product')
                notificationService.success("Cập nhật sản phẩm thành công thành công");


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
    watch: {
        productSelected: {
            handler: async function (newProduct) {
                this.form = {
                    ...newProduct,
                    productInventoryResponse: {
                        id: newProduct.productInventoryResponse?.inventory?.id || '',
                        name: newProduct.productInventoryResponse?.inventory?.inventoryName || ''
                    },
                    productStatusResponse: {
                        id: newProduct.productStatusResponse?.id || '',
                        name: newProduct.productStatusResponse?.name || ''
                    },
                    productBrand: {
                        id: newProduct.productBrand?.id || '',
                        name: newProduct.productBrand?.name || ''
                    },
                    productCategories: {
                        id: newProduct.productCategories?.id || '',
                        name: newProduct.productCategories?.name || ''
                    },
                    productVolume: newProduct.productVolume || '0',
                    productPrice: newProduct.productPrice || '0',
                    productWeight: newProduct.productWeight || '0',
                    productWidth: newProduct.productWidth || '0',
                    productHeight: newProduct.productHeight || '0',
                    productLength: newProduct.productLength || '0',
                    productQuantity: newProduct.productQuantity || '0',

                };

                this.listImagePreview = [];
                this.loading = true;
                try {
                    if (Array.isArray(newProduct.productImageMappingResponse)) {
                        await this.processImages(newProduct.productImageMappingResponse);
                    }
                } catch (error) {
                    console.error('Lỗi khi xử lý ảnh:', error);
                } finally {
                    this.loading = false;
                }
                console.log('listImagePreview:', this.listImagePreview);
                this.listImagePreview.forEach(file => {
                    console.log(file instanceof File);
                });
                if (!this.loading) {
                    this.processImages(this.listImagePreview);
                }
            },
            deep: true,  // Theo dõi sự thay đổi sâu trong đối tượng productSelected
            immediate: true  // Đảm bảo watcher chạy ngay khi component được tạo
        }
    }






}
</script>

<style></style>