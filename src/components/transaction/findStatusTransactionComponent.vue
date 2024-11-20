<template>
    <div class="p-4 bg-white shadow-md rounded mb-4">
        <form @submit.prevent="findTransaction" class="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
            <div class="w-full lg:w-1/3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Đối tượng: </label>
                <select v-model="dataSearch.auth" id="status"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="CUSTOMER">Khách hàng</option>
                    <option value="SUPPLIER">Đối tác</option>
                </select>
            </div>
            <div class="w-full lg:w-1/3">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Trạng thái</label>
                <select v-model="dataSearch.status" id="status"
                    class="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option selected value="PENDING">Chờ duyệt</option>
                    <option value="CANCEL">Bị hủy</option>
                    <option value="COMPETED">Hoàn thành</option>
                </select>
            </div>

            <div class="w-full lg:w-auto flex justify-end items-end space-x-2">
                <Button :text="'Tìm Kiếm'" type="submit"></Button>
            </div>
        </form>
    </div>
</template>

<script>
import Button from '../buttons/button.vue';
export default {
    name: "findStatusTransactionComponent",
    components: {
        Button
    },
    data() {
        return {
            dataSearch: {
                auth: 'CUSTOMER',
                status: 'PENDING'
            }

        }
    },
    emits: ['search'],
    methods: {
        findTransaction() {
            this.$emit('search', { ...this.dataSearch })
        }
    }
}
</script>

<style></style>