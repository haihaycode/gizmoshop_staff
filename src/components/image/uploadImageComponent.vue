<template>
    <div>
        <ImageViewerComponent :isOpen="viewImageSelected ? true : false" :image="viewImageSelected"
            @close="viewImageSelected = null" />

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <!-- Thẻ hình ảnh -->
            <div v-for="(image, index) in images" :key="index" class="relative">
                <!-- Hiển thị hình ảnh dưới dạng Base64 -->
                <img :src="image.preview" @click="viewImage(image.preview)"
                    class="w-full h-32 md:h-48 object-cover rounded-lg shadow-md" />
                <!-- Nút Xóa (X icon) -->
                <span @click="removeImage(index)"
                    class="absolute top-1 right-1 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                    X
                </span>
            </div>

            <!-- Thẻ Thêm Hình Ảnh (chỉ hiện khi có dưới 7 hình ảnh) -->
            <div v-if="images.length < 7"
                class="flex items-center justify-center w-full h-32 md:h-48 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer"
                @click="selectImages">
                <span class="text-3xl font-bold text-gray-400">+</span>
            </div>
            <!-- Input chọn file (ẩn) -->
            <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" multiple hidden />

            <!-- Thông báo (hiển thị khi vượt quá số lượng cho phép) -->
            <div v-if="showAlert" class="col-span-3 p-2 bg-red-100 text-red-700 rounded-md text-center">
                Bạn chỉ có thể chọn tối đa 7 hình ảnh.
            </div>
        </div>
    </div>
</template>

<script>
import ImageViewerComponent from './ImageViewerComponent.vue';

export default {
    components: {
        ImageViewerComponent
    },
    data() {
        return {
            viewImageSelected: '',
            images: [], // Lưu trữ file và bản xem trước Base64
            showAlert: false
        };
    },
    methods: {
        // Mở hộp thoại chọn file
        selectImages() {
            this.$refs.fileInput.click();
        },

        // Xử lý khi chọn file
        handleFileSelect(event) {
            const files = Array.from(event.target.files);
            const maxImages = 7;

            // Kiểm tra nếu thêm các file này sẽ vượt quá giới hạn
            if (this.images.length + files.length > maxImages) {
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 3000);
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = e => {
                    // Lưu trữ cả file và bản xem trước Base64 trong images
if (this.images.length < maxImages) {
                        this.images.push({
                            file: file,
                            preview: e.target.result
                        });
                        this.$emit('update-images', this.images.map(image => image.file)); // Emit chỉ danh sách file
                    }
                };
                reader.readAsDataURL(file);
            });

            // Reset giá trị của input file để có thể chọn lại file giống nhau
            this.$refs.fileInput.value = "";
        },

        // Xóa một hình ảnh khỏi mảng hình ảnh
        removeImage(index) {
            this.images.splice(index, 1);
            this.$emit('update-images', this.images.map(image => image.file)); // Emit cập nhật lại danh sách file
        },

        // Xem hình ảnh
        viewImage(image) {
            this.viewImageSelected = image;
        }
    }
};
</script>

<style scoped>
/* CSS tùy chọn cho component */
</style>