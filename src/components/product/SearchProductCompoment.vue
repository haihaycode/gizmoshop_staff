<template>
  <div class="p-4 bg-white shadow-md rounded mb-4">
    <form @submit.prevent="handleSearch" class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
      <!-- Search by Name -->
      <div class="w-full lg:w-1/3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Tìm theo tên</label>
        <input v-model="name" id="name" type="text"
          class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tên" />
      </div>

      <!-- Filter by Status -->
      <div class="w-full lg:w-1/3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Trạng thái</label>
        <select v-model="deleted" id="status"
          class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option :value="null">Tất cả</option>
          <option v-for="item in status" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>


      <!-- Pagination -->
      <div class="w-full lg:w-auto flex justify-end items-end space-x-2">
        <Button :text="'Tìm Kiếm'"></Button>
      </div>
    </form>
  </div>
</template>

<script>
import { getStatusProduct } from '@/api/productApi'
import Button from '../buttons/button.vue';

export default {
  components: {
    Button
  },
  data() {
    return {
      status: [],
      name: "",
      deleted: "",
    };
  },
  mounted() {
    this.getListStatusProduct()
  },
  methods: {
    async getListStatusProduct() {
      try {
        const res = await getStatusProduct()
        this.status = res.data
      } catch (error) {
        console.error(error)
      }
    },
    handleSearch() {
      this.$emit("search", {
        name: this.name,
      });
    },
  },
};
</script>

<style scoped>
/* Không cần thêm CSS tùy chỉnh vì đã dùng Tailwind CSS */
</style>
