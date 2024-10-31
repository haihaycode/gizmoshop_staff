<template>
  <div class="flex justify-between items-center overflow-x-auto">
    <div>
      <!-- Select option to change items per page -->
      <select v-model="localItemsPerPage" @change="updateLimit" class="px-2 py-1 ">
        <option class="bg-opacity-0" v-for="option in limitOptions" :key="option" :value="option">{{ option }} mục
        </option>
      </select>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-center">
      <!-- Previous Button -->
      <button @click="prevPage" :disabled="currentPage === 1"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400 transition-colors duration-200"
        aria-label="Previous">
        <i class="bx bxs-chevron-left"></i>
      </button>

      <!-- First Page Button -->
      <button v-if="currentPage > 2" @click="goToPage(1)"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200">
        1
      </button>

      <!-- Left Ellipsis -->
      <span v-if="currentPage > 3" class="mx-1">...</span>

      <!-- Middle Page Buttons -->
      <button v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :class="{
        'bg-[#ffa500] text-white border border-[#ffa500]': currentPage === page,
        'bg-gray-200 hover:bg-gray-300 transition-colors duration-200': currentPage !== page
      }" class="mx-1 px-3 py-1 rounded-md">
        {{ page }}
      </button>

      <!-- Right Ellipsis -->
      <span v-if="currentPage < totalPages - 2" class="mx-1">...</span>

      <!-- Last Page Button -->
      <button v-if="currentPage < totalPages" @click="goToPage(totalPages)"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200">
        {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200"
        aria-label="Next">
        <i class="bx bxs-chevron-right"></i>
      </button>
    </div>
    <!-- Pagination -->

    <div>
      <div class="px-2">
        Trang {{ currentPage }} / {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localItemsPerPage: this.itemsPerPage, // Tạo biến local để giữ giá trị
      limitOptions: [5, 10, 15, 20] // Các lựa chọn số mục mỗi trang
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.localItemsPerPage); // Sử dụng localItemsPerPage
    },
    pagesToShow() {
      const pages = [];
      const startPage = Math.max(2, this.currentPage - 1);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('page-changed', page);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    updateLimit() {
      this.$emit('limit-changed', this.localItemsPerPage); // Phát ra sự kiện với giá trị mới
    }
  },
  watch: {
    itemsPerPage(newVal) {
      this.localItemsPerPage = newVal; // Cập nhật giá trị local khi prop thay đổi
    }
  }
};
</script>

<style scoped>
/* Bạn có thể thêm kiểu dáng tùy chỉnh tại đây */
</style>
