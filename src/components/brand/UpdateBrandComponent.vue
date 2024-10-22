<template>
  <ModalBox
    :isOpen="isOpen"
    :loading="isLoading"
    :closeModal="closeModal"
    :closeText="'Đóng'"
  >
    <!-- Modal Header Slot -->
    <template #header>
      <h3 class="sm:text-sm md:text-lg font-bold">Cập Nhật Thương Hiệu</h3>
    </template>
    <!-- Modal Body Slot -->
    <template #body>
      <form @submit.prevent="validateForm">
        <!-- Tên Thương Hiệu -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
            >Tên thương hiệu *</label
          >
          <input
            v-model="form.name"
            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            :class="errors.name ? 'border-red-500' : ''"
            id="name"
            placeholder="Nhập tên thương hiệu"
          />
          <p class="lg:text-sm text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Mô Tả -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
            >Mô tả *</label
          >
          <input
            v-model="form.description"
            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            :class="errors.description ? 'border-red-500' : ''"
            id="description"
            placeholder="Nhập mô tả"
          />
          <p class="lg:text-sm text-red-500">{{ errors.description }}</p>
        </div>

        <!-- Trạng Thái -->
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="deleted"
            >Trạng thái *</label
          >
          <select
            v-model="form.deleted"
            class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            :class="errors.deleted ? 'border-red-500' : ''"
            id="deleted"
          >
            <option value="false">Hoạt động</option>
            <option value="true">Ngừng hoạt động</option>
          </select>
          <p class="lg:text-sm text-red-500">{{ errors.deleted }}</p>
        </div>

        <div class="flex justify-end">
          <Button
            :isLoading="isLoading"
            :text="'Cập Nhật'"
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
          >
          </Button>
        </div>
      </form>
    </template>
  </ModalBox>
  <NotificationModal
    :isOpen="NotificationModalIsOpen"
    :message="message"
    :type="messageType"
    @close="NotificationModalIsOpen = false"
    :title="'Thông báo'"
  ></NotificationModal>
</template>

<script>
import ModalBox from "../modal/ModalBox.vue";
import { mapGetters } from "vuex";
import * as Yup from "yup";
import { updateBrand } from "@/api/brandApi"; // API for updating brand
import NotificationModal from "../modal/NotificationModal.vue";
import Button from "../buttons/button.vue";

export default {
  name: "UpdateBrandComponent",
  components: {
    ModalBox,
    NotificationModal,
    Button,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      NotificationModalIsOpen: false,
      messageType: "",
      message: "",
      form: {
        name: this.brand.name,
        description: this.brand.description,
        deleted: this.brand.deleted,
      },
      errors: {
        name: "",
        description: "",
        deleted: "",
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async validateForm() {
      this.errors = { name: "", description: "", deleted: "" }; // Reset errors
      const schema = Yup.object().shape({
        name: Yup.string().required("Tên thương hiệu là bắt buộc"),
        description: Yup.string().required("Mô tả là bắt buộc"),
        deleted: Yup.boolean().required("Trạng thái là bắt buộc"),
      });
      try {
        await schema.validate(this.form, { abortEarly: false });
        await this.updateBrand(); // Gọi hàm updateBrand nếu xác thực thành công
      } catch (err) {
        // Lưu trữ tất cả lỗi
        err.inner.forEach((validationError) => {
          this.errors[validationError.path] = validationError.message;
        });
      }
    },

    async updateBrand() {
      this.isLoading = true;
      try {
        const brandUpdate = { ...this.form, id: this.brand.id };
        const res = await updateBrand(brandUpdate);
        this.message = res.message || "Cập nhật thương hiệu thành công!"; // Hiển thị thông báo từ server hoặc thông báo mặc định
        console.log(this.message); // Log thông báo thành công
        this.messageType = "success";
        this.NotificationModalIsOpen = true;
        this.$emit("update-success"); // Emit event cho cập nhật thành công
        this.closeModal(); // Đóng modal
      } catch (error) {
        this.message = error.message || "Có lỗi xảy ra!";
        this.messageType = "error";
        this.NotificationModalIsOpen = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
