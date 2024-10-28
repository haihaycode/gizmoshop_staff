<template>
    <div class="p-4 bg-white shadow-md rounded mb-4">
        <form @submit.prevent="handleSearch" class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
            <!-- Search by Code -->
            <div class="w-full lg:w-1/3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="searchCode">Tìm theo mã giảm giá</label>
                <input v-model="code" id="searchCode" type="text"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập mã giảm giá">
            </div>

            <!-- Filter by Status -->
            <div class="w-full lg:w-1/3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Trạng thái</label>
                <select v-model="status" id="status"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Tất cả</option>
                    <option value="true">Hoạt động</option>
                    <option value="false">Ngừng hoạt động</option>
                </select>
            </div>

            <!-- Search Button -->
            <div class="w-full lg:w-auto flex justify-end items-end">
                <button type="submit"
                    class="bg-[#0e0b36] hover:bg-[#2a2eaed7] text-white font-bold py-2 px-4 rounded w-full lg:w-auto transition-all duration-300">
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
            code: '',
            status: ''
        };
    },
    methods: {
        handleSearch() {
            this.$emit('search', { code: this.code, status: this.status });
        }
    }
};
</script>

<style scoped>
/* No extra styles needed as Tailwind covers it all */
</style>
•