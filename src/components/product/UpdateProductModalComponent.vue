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
                        <input type="number" v-model="form.productPrice" min="0" step="1"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productPrice ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" />
                        <p class="lg:text-sm text-red-500">{{ errors.productPrice }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Số lượng sản phẩm
                            *</label>
                        <input type="number" v-model="form.productQuantity" min="0" step="1"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productQuantity ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" />
                        <p class="lg:text-sm text-red-500">{{ errors.productQuantity }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discountProduct">Giảm giá (%)
                            *</label> 
                        <input type="number" v-model="form.discountProduct" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.discountProduct ? 'border-red-500' : ''" id="discountProduct"
                            placeholder="Nhập tỷ lệ giảm giá sản phẩm (%)" />
                        <p class="lg:text-sm text-red-500">{{ errors.discountProduct }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWeight">Khối lượng
                            *</label>
                        <input type="number" v-model="form.productWeight" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWeight ? 'border-red-500' : ''" id="productWeight"
                            placeholder="Nhập khối lượng sản phẩm (kg)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productWeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productArea">Diện tích *</label>
                        <input type="number" v-model="form.productArea" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productArea ? 'border-red-500' : ''" id="productArea"
                            placeholder="Nhập diện tích sản phẩm (m²)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productArea }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productVolume">Thể tích *</label>
                        <input type="number" v-model="form.productVolume" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productVolume ? 'border-red-500' : ''" id="productVolume"
                            placeholder="Nhập thể tích sản phẩm (m³)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productVolume }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWidth">Chiều rộng
                            *</label>
                        <input type="number" v-model="form.productWidth" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWidth ? 'border-red-500' : ''" id="productWidth"
                            placeholder="Nhập chiều rộng sản phẩm (cm)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productWidth }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productHeight">Chiều cao
                            *</label>
                        <input type="number" v-model="form.productHeight" min="0" step="0.01"
                            @blur="form.productHeight = form.productHeight ? form.productHeight : 0"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productHeight ? 'border-red-500' : ''" id="productHeight"
                            placeholder="Nhập chiều cao sản phẩm (cm)" />
                        <p class="lg:text-sm text-red-500">{{ errors.productHeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productLength">Chiều dài
                            *</label>
                        <input type="number" v-model="form.productLength" min="0" step="0.01"
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


                    <table v-if="isTableVisible || specifications.length > 0"
                        class="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="px-4 py-2 text-left text-gray-800">STT</th>
                                <th class="px-4 py-2 text-left text-gray-800">Tên thông số</th>
                                <th class="px-4 py-2 text-left text-gray-800">Giá trị thông số</th>
                                <th class="px-4 py-2 text-left text-gray-800"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(spec, index) in specifications" :key="index">
                                <!-- STT -->
                                <td class="px-4 py-2 border-b border-gray-300">{{ index + 1 }}</td>
                                <!-- Tên thông số -->
                                <td class="px-4 py-2 border-b border-gray-300">
                                    <input v-model="spec.name"
                                        class="w-full mt-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out py-2 px-3 text-gray-700 leading-tight"
                                        :id="'specName' + index" placeholder="Nhập tên thông số" />
                                </td>
                                <!-- Giá trị thông số -->
                                <td class="px-4 py-2 border-b border-gray-300">
                                    <input v-model="spec.value"
                                        class="w-full mt-1 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out py-2 px-3 text-gray-700 leading-tight"
                                        :id="'specValue' + index" placeholder="Nhập giá trị thông số" />
                                </td>
                                <!-- Nút Xóa -->
                                <td class="px-4 py-2 border-b border-gray-300 text-center">
                                    <Button type="button" @click="removeSpecification(index)"
                                        class="text-red-500 hover:text-red-700 font-bold" :text="'X'"></Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>




                    <div class="mb-4">
                        <Button @click="addSpecifications" :text="'thêm thông số kỹ thuật'" type="button"></Button>
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
            @itemClicked="(item) => { form.productCategories = { id: item.id, name: item.name } }">
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
            isTableVisible: false,
            listStatus: [],
            message: '',
            listImagePreview: [],
            specifications: [],
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
                productQuantity: 0,
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
        addSpecifications() {
            this.specifications.push({ name: '', value: '' });
            this.isTableVisible = true;
        },
        removeSpecification(index) {
            this.specifications.splice(index, 1);
        },

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
                const specificationsData = this.specifications.reduce((acc, spec) => {
                    if (spec.name && spec.value) {
                        acc[spec.name] = spec.value;
                    }
                    return acc;
                }, {});

                // Chuyển `specificationsData` sang JSON
                const specificationsJson = specificationsData && Object.keys(specificationsData).length > 0
                    ? `\n[[[\n${JSON.stringify(specificationsData, null, 2)}\n]]]`
                    : "";

                const data = {
                    productName: this.form.productName,
                    thumbnail: this.form.thumbnail,
                    productCategoryId: this.form.productCategories?.id,
                    productPrice: this.form.productPrice,
                    discountProduct: this.form.discountProduct,
                    productShortDescription: `${this.form.productShortDescription}\n${specificationsJson}`,
                    productLongDescription: this.form.productLongDescription,
                    productWeight: this.form.productWeight,

                    productArea: this.form.productLength*this.form.productWidth,
                    productVolume: (this.form.productLength*this.form.productWidth*this.form.productHeight)/1000000,

                    productHeight: this.form.productHeight,
                    productLength: this.form.productLength,
                    productBrandId: this.form.productBrand?.id,
                    inventoryId: this.form.productInventoryResponse?.id,
                    quantity: this.form.productQuantity,
                    productStatusResponseId: this.form.productStatusResponse?.id,
                    Width: this.form.productWidth,
                   
                }
                console.log("Data gửi vào updateProduct:", data);
                const res = await updateProduct(this.form.id, data)
                if (this.form.selectedImages && this.form.selectedImages.length > 0) {
                    const dataUpdateImage = {
                        productId: res.data.id,
                        files: this.form.selectedImages
                    };
                    console.log("Data gửi vào addImageProduct:", dataUpdateImage);
                    await this.addImageProduct(dataUpdateImage);
                }
                this.closeModal();
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
                await updataImage(formData);
            } catch (error) {
                console.error(error);
            }
        }
    },
    watch: {
        productSelected: {
            handler: async function (newProduct) {
                function extractSpecifications(description) {
                    const regex = /\[\[\[\s*(\{.*?\})\s*\]\]\]/s; // Tìm chuỗi [[[ {...} ]]]
                    const match = description.match(regex);

                    if (match) {
                        try {
                            const parsedSpecifications = JSON.parse(match[1]); // Parse JSON từ chuỗi
                            const specifications = Object.entries(parsedSpecifications).map(([name, value]) => ({ name, value }));
                            // Loại bỏ thông số kỹ thuật khỏi productShortDescription
                            const cleanedDescription = description.replace(regex, "").trim();
                            return { specifications, cleanedDescription };
                        } catch (error) {
                            console.error("Lỗi khi parse thông số kỹ thuật:", error);
                        }
                    }
                    return { specifications: [], cleanedDescription: description };
                }
                const { specifications, cleanedDescription } = extractSpecifications(newProduct.productShortDescription || "");
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
                    productQuantity: newProduct.quantityBr || '0',
                    productShortDescription: cleanedDescription,
                };

                this.specifications = specifications;

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
                // console.log('listImagePreview:', this.listImagePreview);
                // this.listImagePreview.forEach(file => {
                //     console.log(file instanceof File);
                // });
                if (!this.loading) {
                    this.processImages(this.listImagePreview);
                }
            },
            deep: true,
            immediate: true
        }
    }






}
</script>

<style></style>