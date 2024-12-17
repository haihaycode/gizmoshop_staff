<template>
  <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">

    <template #header>
      <h3 class="sm:text-sm md:text-lg font-bold">Thêm Thương Hiệu mới</h3>
    </template>

    <template #body>
      <form @submit.prevent="submitFormData">

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Tên thương hiệu *
          </label>
          <input v-model="form.name" :class="errors.name ? 'border-red-500' : 'border-gray-300'"
            class="shadow-none border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="name" placeholder="Nhập tên thương hiệu" />
          <p class="lg:text-sm text-red-500">{{ errors.name }}</p>
        </div>


        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Mô tả *
          </label>
          <input v-model="form.description" :class="errors.description ? 'border-red-500' : 'border-gray-300'"
            class="shadow-none border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="description" placeholder="Nhập mô tả" />
          <p class="lg:text-sm text-red-500">{{ errors.description }}</p>
        </div>


        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="deleted">
            Trạng thái *
          </label>
          <select v-model="form.deleted" :class="errors.deleted ? 'border-red-500' : 'border-gray-300'"
            class="shadow-none border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="deleted">
            <option :value="false">Hoạt động</option>
            <option :value="true">Ngừng hoạt động</option>
          </select>
          <p class="lg:text-sm text-red-500">{{ errors.deleted }}</p>
        </div>

        <div class="flex justify-end">
          <Button :isLoading="isLoading" :text="'Lưu'" type="submit"
            class="px-4 py-2 text-white rounded-sm hover:bg-[#271a1a]">
          </Button>
        </div>
      </form>
    </template>
  </ModalBox>

  <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
    @close="NotificationModalIsOpen = false" :title="'Thông báo'"></NotificationModal>
</template>

<script>
import ModalBox from "../modal/ModalBox.vue";
import { mapGetters } from "vuex";
import * as Yup from "yup"; // Import Yup
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
        name: "",
        description: "",
        deleted: false,
      },
      errors: {},
    };
  },
  emits: ["close", "create-success"],
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

    validateSchema() {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Tên thương hiệu không được để trống")
          .max(50, "Tên thương hiệu không được vượt quá 50 ký tự"),
        description: Yup.string()
          .required("Mô tả không được để trống")
          .max(255, "Mô tả không được vượt quá 255 ký tự"),
        deleted: Yup.boolean().required("Trạng thái không được để trống"),
      });

      return schema;
    },
    async submitFormData() {
      try {

        const schema = this.validateSchema();
        await schema.validate(this.form, { abortEarly: false });

        const data = { ...this.form };
        const res = await createBrand(data);

        this.message =
          res?.data?.message || "Thương hiệu đã được tạo thành công";
        this.messageType = "success";
        this.NotificationModalIsOpen = true;
        this.loadBrand();
      } catch (error) {
        if (error.name === "ValidationError") {

          this.errors = {};
          error.inner.forEach((err) => {
            this.errors[err.path] = err.message;
          });
        } else {

          console.error("Lỗi khi thêm thương hiệu:", error);
          this.message = error.message || "Có lỗi xảy ra";
          this.messageType = "error";
          this.NotificationModalIsOpen = true;
        }
      }
    },
  },
};
</script>

<style scoped>
input,
select {
  border: none;
  border-bottom: 2px solid #ddd;
}

input:focus,
select:focus {
  outline: none;
  border-bottom-color: #3b82f6;
}
</style>
