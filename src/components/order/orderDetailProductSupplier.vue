<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :loading="isLoading">
            <template #header>
                <h1 class="sm:text-sm md:text-lg font-bold">Thông tin của sản phẩm <span class="text-blue-500">{{
                    form?.productName }}</span></h1>
            </template>
            <template #body>
                <form @submit.prevent="validateForm">

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Tên sản phẩm
                            *</label>
                        <input v-model="form.productName"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productName ? 'border-red-500' : ''" id="productName"
                            placeholder="Nhập tên sản phẩm" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productName }}</p>
                    </div>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productInventoryResponse">
                            Sản phẩm đang thuộc kho *
                        </label>
                        <input v-model="form.productInventoryResponse.name"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            id="productInventoryResponse" placeholder="Chọn kho mới" readonly />

                        <p class="lg:text-sm text-red-500">{{ errors.productInventoryResponse?.id }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productName">Trạng thái sản phẩm
                            *</label>
                        <select class="border-b-2 w-full" v-model="form.productStatusResponse.id"
                            @change="handleStatusSelect">
                            <option :disabled="form.productStatusResponse.id !== status.id" v-for="status in listStatus"
                                :key="status.id" :value="status.id">
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
                        <p class="lg:text-sm text-red-500">{{ errors.productCategories?.id }}</p>
                    </div>

                    <div class="mb-4 relative">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productCategory">Thương hiệu
                            *</label>
                        <input v-model="form.productBrand.name" @click="modalSelectBrandComponentIsOpen = true"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 pr-10"
                            id="productCategory" placeholder="Chọn danh mục" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productBrand?.id }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Giá Gốc sản phẩm
                            *</label>
                        <input type="number" v-model="form.productPrice" min="0" step="1"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productPrice ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productPrice }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productPrice">Số lượng sản phẩm
                            *</label>
                        <input type="number" v-model="form.productQuantity" min="0" step="1"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productQuantity ? 'border-red-500' : ''" id="productPrice"
                            placeholder="Nhập giá gốc sản phẩm" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productQuantity }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="discountProduct">Giảm giá (%)
                            *</label>
                        <input type="number" v-model="form.discountProduct" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.discountProduct ? 'border-red-500' : ''" id="discountProduct"
                            placeholder="Nhập tỷ lệ giảm giá sản phẩm (%)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.discountProduct }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWeight">Khối lượng
                            *</label>
                        <input type="number" v-model="form.productWeight" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWeight ? 'border-red-500' : ''" id="productWeight"
                            placeholder="Nhập khối lượng sản phẩm (kg)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productWeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productArea">Diện tích *</label>
                        <input type="number" v-model="form.productArea" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productArea ? 'border-red-500' : ''" id="productArea"
                            placeholder="Nhập diện tích sản phẩm (m²)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productArea }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productVolume">Thể tích *</label>
                        <input type="number" v-model="form.productVolume" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productVolume ? 'border-red-500' : ''" id="productVolume"
                            placeholder="Nhập thể tích sản phẩm (m³)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productVolume }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productWidth">Chiều rộng
                            *</label>
                        <input type="number" v-model="form.productWidth" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productWidth ? 'border-red-500' : ''" id="productWidth"
                            placeholder="Nhập chiều rộng sản phẩm (cm)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productWidth }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productHeight">Chiều cao
                            *</label>
                        <input type="number" v-model="form.productHeight" min="0" step="0.01"
                            @blur="form.productHeight = form.productHeight ? form.productHeight : 0"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productHeight ? 'border-red-500' : ''" id="productHeight"
                            placeholder="Nhập chiều cao sản phẩm (cm)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productHeight }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productLength">Chiều dài
                            *</label>
                        <input type="number" v-model="form.productLength" min="0" step="0.01"
                            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                            :class="errors.productLength ? 'border-red-500' : ''" id="productLength"
                            placeholder="Nhập chiều dài sản phẩm (cm)" readonly />
                        <p class="lg:text-sm text-red-500">{{ errors.productLength }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productShortDescription">Mô tả
                            ngắn *</label>
                        <textarea readonly v-model="form.productShortDescription"
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
                                    <Button @click="removeSpecification(index)"
                                        class="text-red-500 hover:text-red-700 font-bold" :text="'X'"></Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>




                    <!-- <div class="mb-4">
                        <Button @click="addSpecifications" :text="'thêm thông số kỹ thuật'" type="button"></Button>
                    </div> -->

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="productLongDescription">Mô tả dài
                            *</label>
                        <ckeditor :disabled="true" v-model="form.productLongDescription" :editor="editor"
                            @ready="onEditorReady" @change="onEditorChange">
                        </ckeditor>
                        <p class="lg:text-sm text-red-500">{{ errors.productLongDescription }}</p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="">Chọn hình cho sản phẩm</label>
                        <uploadImageComponent :isDisabled="true" :listImages="listImagePreview"
                            @update-images="handleSelectImages" @update-prod="loadProp">
                        </uploadImageComponent>
                    </div>

                    <!-- <div class="flex justify-end">
                        <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                        </Button>
                    </div> -->
                </form>
            </template>
        </ModalBox>

        <!-- modalSelectCategoryComponent  -->

    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import MyUploadAdapter from '@/utils/myUploadAdapter';
import { mapGetters } from 'vuex';
import Button from '../buttons/button.vue';
import uploadImageComponent from '../image/uploadImageComponent.vue';
import { loadImage } from "@/services/imageService";
import { getStatusProduct } from '@/api/productApi'
export default {
    name: 'detailProductSupplier',
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
        async getListStatus() {
            try {
                const res = await getStatusProduct();
                this.listStatus = res.data
            } catch (error) {
                console.error(error)
            }
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
                    productQuantity: newProduct.productQuantity || '0',
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