<template>
    <div>
        <h1 class="text-3xl font-bold text-center text-blue-600 uppercase mb-6">
            Danh sách các nhà cung cấp đã & đang cung cấp sản phẩm
        </h1>
        <TableComponent :items="staffList" :isLoading="isLoading">
            <template #header>
                <th @click="changeSort('account.id')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">STT <span
                        v-html="getSortIcon('account.id')"></span></th>
                <th @click="changeSort('account.fullname')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">TÊN NHÀ
                    CUNG
                    CẤP
                    <span v-html="getSortIcon('account.fullname')"></span>
                </th>
                <th @click="changeSort('account.email')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">EMAIL
                    <span v-html="getSortIcon('account.email')"></span>
                </th>
                <th @click="changeSort('account.sdt')"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">SỐ ĐIỆN
                    THOẠI
                    <span v-html="getSortIcon('account.sdt')"></span>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Công cụ
                </th>
            </template>

            <template #body>
                <tr @click="detaiModal(item)" v-for="(item, index) in staffList" :key="index" class="hover:bg-gray-300">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.nameSupplier }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.accountResponse.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.accountResponse.sdt }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <toggleButton :is-toggled="!item.deleted" @update:isToggled="handleStatusSupplier(item)">
                        </toggleButton>
                    </td>
                    <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <i @click="handleModalSetting(item.id)" class='bx bx-cog text-xl'></i>
                    </td> -->
                </tr>
            </template>

            <template #footer>
                <td colspan="4"></td>
            </template>

            <template #pagination>
                <div>
                    <Pagination :total-items="Number(pagination.totalElements)" :items-per-page="limit"
                        :current-page="page + 1" @page-changed="handlePageChange" @limit-changed="handleLimitChange">
                    </Pagination>
                </div>
            </template>
        </TableComponent>
    </div>
    <DetailProductSupplier @closeModal="ModalDetailIsOpen = false" :isOpen="ModalDetailIsOpen"
        :author="authorSeleected">
    </DetailProductSupplier>

</template>

<script>
import { getListSupplier, updateStatusSupplier } from '@/api/supplierApi';
import TableComponent from '../table/TableComponent.vue';
import Pagination from '../pagination/Pagination.vue';
import { mapGetters } from 'vuex';
import DetailProductSupplier from './detailProductSupplier.vue';
import toggleButton from '../buttons/toggleButton.vue';

export default {
    name: 'listSupplierComponent',
    components: {
        TableComponent,
        Pagination,
        DetailProductSupplier,
        toggleButton

    },
    data() {
        return {
            keyword: '',
            ModalDetailIsOpen: false,
            authorSeleected: null,
            idAccountSelected: null,
            pagination: [],
            staffList: [],
            sortField: 'id',
            sortDirection: 'desc',
            limit: 5,
            page: 0
        };
    },

    computed: {
        ...mapGetters('loading', ['isLoading'])
    },

    mounted() {
        this.getListAllAccount();
    },
    methods: {
        async getListAllAccount() {
            try {
                const data = {
                    keyword: this.keyword,
                    deleted: false,
                    page: this.page,
                    limit: this.limit,
                    sort: `${this.sortField},${this.sortDirection}`

                }
                const response = await getListSupplier(data);
                this.pagination = response.data;
                this.staffList = response.data.content;
                console.log(this.staffList);
            } catch (error) {
                console.error('Error loading staff list:', error);
            }
        },
        async handleStatusSupplier(item) {
            try {
                const data = {
                    deleted: !item.deleted
                }
                await updateStatusSupplier(item.accountResponse.id, data);
                this.$emit('succes');
            } catch (error) {
                console.error(error);
            }
        },
        detaiModal(data) {
            this.authorSeleected = data
            this.ModalDetailIsOpen = !this.ModalDetailIsOpen;
        },
        async changeSort(column) {
            if (this.sortField === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = column;
                this.sortDirection = 'asc';
            }
            await this.getListAllAccount();
        },
        getSortIcon(column) {
            if (this.sortField === column) {
                return this.sortDirection === 'asc'
                    ? "<i class='bx bx-sort-a-z'></i>"
                    : "<i class='bx bx-sort-z-a'></i>";
            }
            return '';
        },

        handlePageChange(newPage) {
            this.page = newPage - 1;
            this.getListAllAccount();
        },
        handleLimitChange(limitPanigation) {
            this.limit = limitPanigation;
            this.page = 0;
            this.getListAllAccount();
        },
        handleModalSetting(accountId) {
            this.idAccountSelected = accountId;
            this.ModalSettingIsOpen = !this.ModalSettingIsOpen;
        },
        handleChangeRole() {
            this.roleUser = this.staffList.find(staff => staff.id === this.idAccountSelected)?.roles || [];
            this.ModalUpdateIsOpen = !this.ModalUpdateIsOpen;
        },
        handleresetpass() {
            this.resetPass(this.idAccountSelected)
        },
        updateStaffModal() {
            this.ModalUpdateStaffIsOpen = !this.ModalUpdateStaffIsOpen;
        }

    }
}
</script>

<style></style>