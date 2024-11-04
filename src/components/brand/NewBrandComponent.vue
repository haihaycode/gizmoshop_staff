<template>
  <ModalBox
    :isOpen="isOpen"
    :loading="isLoading"
    :closeModal="closeModal"
    :closeText="'Đóng'"
  >
    <!-- Modal Header Slot -->
    <template #header>
      <h3 class="sm:text-sm md:text-lg font-bold">Thêm Thương Hiệu mới</h3>
    </template>
    <!-- Modal Body Slot -->
    <template #body>
      <form @submit.prevent="submitFormData">
        <!-- Name -->
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

        <!-- Description -->
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

        <!-- Status -->
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
            <option :value="false">Hoạt động</option>
            <option :value="true">Ngừng hoạt động</option>
          </select>
          <p class="lg:text-sm text-red-500">{{ errors.deleted }}</p>
        </div>

        <div class="flex justify-end">
          <Button
            :isLoading="isLoading"
            :text="'Lưu'"
            type="submit"
            class="px-4 py-2 text-white rounded-sm hover:bg-[#271a1a]"
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
// import * as Yup from "yup";
import { createBrand } from "@/api/brandApi";
import NotificationModal from "../modal/NotificationModal.vue";
import Button from "../buttons/button.vue";

export default {
  name: "NewBrandComponent",
  components: {
    ModalBox,
    NotificationModal,
    Button,
  },
  data() {
    return {
      NotificationModalIsOpen: false,
      messageType: "",
      message: "",
      form: {
        name: "", // Tên thương hiệu
        description: "", // Mô tả
        deleted: false, // Trạng thái (Hoạt động/Ngừng hoạt động)
      },
      errors: {
        name: "",
        description: "",
        deleted: "",
      },
    };
  },
  emits: ['close', 'create-success'],
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    loadBrand() {
      this.$emit("create-success");
    },
    closeModal() {
      this.$emit("close");
    },
    async submitFormData() {
      try {
        const data = {
          name: this.form.name,
          description: this.form.description,
          deleted: this.form.deleted,
        };
        const res = await createBrand(data);
        if (res && res.data && res.data.message) {
          this.message = res.data.message;
        } else {
          this.message = "Thương hiệu đã được tạo thành công"; 
        } 
        this.message = res.message; 
        this.messageType = "success";
        this.NotificationModalIsOpen = true;
        this.loadBrand()
      } catch (error) {
        console.error("Lỗi khi thêm thương hiệu:", error); 
        this.message = error.message || "Có lỗi xảy ra";
        this.messageType = "error";
        this.NotificationModalIsOpen = true;
      }
    },
  },
};
</script>

<style scoped>
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
