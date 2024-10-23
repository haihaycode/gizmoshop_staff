<template>
  <div class="p-4 bg-gray-100 shadow-md rounded mb-4">
    <form
      @submit.prevent="handleSearch"
      class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4"
    >
      <!-- Search by Name -->
      <div class="w-full lg:w-1/3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
          >Tìm theo tên</label
        >
        <input
          v-model="name"
          id="name"
          type="text"
          class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nhập tên"
        />
      </div>

      <!-- Filter by Status -->
      <div class="w-full lg:w-1/3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="status"
          >Trạng thái</label
        >
        <select
          v-model="deleted"
          id="status"
          class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Tất cả</option>
          <option :value="true">Đã xóa</option>
          <option :value="false">Chưa xóa</option>
        </select>
      </div>

      <!-- Pagination -->
      <div class="w-full lg:w-auto flex justify-end items-end space-x-2">
        <button
          type="submit"
          class="bg-[#0e0b36] hover:bg-[#2a2eaed7] text-white font-bold py-2 px-4 rounded transition-all duration-300"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      deleted: "",
    };
  },
  methods: {
    handleSearch() {
      console.log("Search Params:", { name: this.name, deleted: this.deleted });
      this.$emit("search", {
        name: this.name,
        deleted: this.deleted,
      });
    },
  },
};
</script>

<style scoped>
/* Không cần thêm CSS tùy chỉnh vì đã dùng Tailwind CSS */
</style>
