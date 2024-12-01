<template>
    <div>
        <TableComponent :items="supplierResCancel" :loading="isLoading">
            <template #header>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">STT</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">NHÀ CUNG CẤP
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">LÝ DO HỦY</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">NGÀY HỦY</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">NGƯỜI HỦY</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
                </th>
            </template>
            <template #body>
                <tr v-for="(item, index) in supplierResCancel" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.nameSupplier }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{
                        item.accountResponse?.fullname }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Button @click="acceptCancelSupplier(item.accountResponse?.id)"
                            :text="'Chấp nhận hủy'"></Button>
                    </td>
                </tr>
            </template>
            <template #footer>
                <div col-span="6"></div>
            </template>
            <template #pagination>
                <div>
                    <Pagination :total-items="pagination?.totalElements || 1" :items-per-page="limit"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>
    </div>
</template>

<script>
import Pagination from '../pagination/Pagination.vue';
import notificationService from '@/services/notificationService';
import Button from '../buttons/button.vue';
import TableComponent from '../table/TableComponent.vue'
import { ListsupplierResCancel, acceptCancelSupplier } from '@/api/supplierApi'


export default {
    name: 'supplierResSupplier',
    components: {
        Pagination,
        Button,
        TableComponent
    },
    data() {
        return {
            pagelist: null,
            page: 0,
            supplierResCancel: []
        }
    },
    mounted() {
        this.getSupplierResCancel();
    },
    methods: {
        async getSupplierResCancel() {
            try {
                const response = await ListsupplierResCancel();
                this.supplierResCancel = response.data.content;
                this.pagelist = response.data;
                console.log(this.supplierResCancel);
            } catch (error) {
                console.error(error);
            }
        },
        async acceptCancelSupplier(id) {
            try {
                await acceptCancelSupplier(id);
                console.log(this.supplierResCancel);
                this.getSupplierResCancel();
                notificationService.success('Chấp nhận hủy nhà cung cấp thành công');
            } catch (error) {
                console.error(error);
            }
        },

        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getListAll();
        },
        handleLimitChange(limitPagination) {
            this.limit = limitPagination;
            this.page = 0;
            this.getListAll();
        },

    },
}
</script>

<style></style>