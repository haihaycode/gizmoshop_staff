<template>
  <div>
    <TableComponent :items="vouchers" :loading="isLoading">
      <!-- Header Slot -->
      <template #header>
        <th @click="changeSort('id')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          STT <span v-html="getSortIcon('id')"></span>
        </th>
        <th @click="changeSort('name')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          MÃ GIẢM GIÁ<span v-html="getSortIcon('name')"></span>
        </th>
        <th @click="changeSort('description')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          MÔ TẢ<span v-html="getSortIcon('description')"></span>
        </th>
        <th @click="changeSort('discountAmount')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          SỐ TIỀN GIẢM GIÁ MỖI ĐƠN HÀNG<span v-html="getSortIcon('discountAmount')"></span>
        </th>
        <th @click="changeSort('discountPercent')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          PHẦN TRĂM GIẢM<span v-html="getSortIcon('discountPercent')"></span>
        </th>
        <th @click="changeSort('maxDiscountAmount')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          SỐ TIỀN GIẢM TỐI ĐA THEO PHẦN TRĂM<span v-html="getSortIcon('maxDiscountAmount')"></span>
        </th>
        <th @click="changeSort('minimumOrderValue')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          GIÁ TRỊ ĐƠN HÀNG TỐI THIỂU<span v-html="getSortIcon('minimumOrderValue')"></span>
        </th>
        <th @click="changeSort('validFrom')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          NGÀY BẮT ĐẦU<span v-html="getSortIcon('validFrom')"></span>
        </th>
        <th @click="changeSort('validTo')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          NGÀY KẾT THÚC<span v-html="getSortIcon('validTo')"></span>
        </th>
        <th @click="changeSort('usedCount')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          SỐ LẦN ĐÃ SỬ DỤNG<span v-html="getSortIcon('usedCount')"></span>
        </th>

        <th @click="changeSort('usageLimit')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          GIỚI HẠN SỬ DỤNG<span v-html="getSortIcon('usageLimit')"></span>
        </th>
        <th @click="changeSort('createdAt')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          NGÀY TẠO<span v-html="getSortIcon('createdAt')"></span>
        </th>
        <th @click="changeSort('updatedAt')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          NGÀY CẬP NHẬT<span v-html="getSortIcon('updatedAt')"></span>
        </th>

        <th @click="changeSort('status')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          TRẠNG THÁI<span v-html="getSortIcon('status')"></span>
        </th>
      </template>
      <!-- Body Slot -->
      <template #body>
        <tr v-for="(item, index) in vouchers" :key="index" class="hover:bg-gray-300"
          @click="handleUpdateVoucherSelected(item)">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ item.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ item.code }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ truncate(item.description, { length: 25 }) }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatCurrencyVN(item.discountAmount) }} VND
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.discountPercent }}%
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatCurrencyVN(item.maxDiscountAmount) }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatCurrencyVN(item.minimumOrderValue) }} VND
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ new Date(item.validFrom).toLocaleDateString() }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ new Date(item.validTo).toLocaleDateString() }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.usedCount }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.usageLimit }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ new Date(item.updatedAt).toLocaleDateString() }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <toggleButton @click.stop :is-toggled="item.status" @update:isToggled="handleChangeStatusVoucher(item.id)">
            </toggleButton>
          </td>
        </tr>
      </template>

      <!-- <template #footer>
                <td colspan="8"></td>
            </template> -->

      <template #pagination>
        <div>
          <Pagination :total-items="pagination?.totalElements" :items-per-page="limit" :current-page="page + 1"
            @page-changed="handlePageChange" @limit-changed="handleLimitChange">
          </Pagination>
        </div>
      </template>
    </TableComponent>
    <!-- update -->
    <UpdateVoucherComponent v-if="voucherUpdateSelected"
      @close="modalUpdateVoucherIsOpen = false, voucherUpdateSelected = null" :isOpen="modalUpdateVoucherIsOpen"
      :voucher="voucherUpdateSelected" @update-success="handlegetVouchers">
    </UpdateVoucherComponent>
  </div>
</template>
<script>
import TableComponent from "../table/TableComponent.vue";
import Pagination from "../pagination/Pagination.vue";
import { formatCurrencyVN } from "@/utils/currencyUtils";
import { getVouchers, changeStatusVoucher } from "@/api/voucherApi";
import { mapGetters } from "vuex";
import UpdateVoucherComponent from "./UpdateVoucherComponent.vue";
import toggleButton from "../buttons/toggleButton.vue";
import notificationService from "@/services/notificationService";
import { truncate } from 'lodash';
export default {
  name: "listVoucherComponent",
  data() {
    return {
      modalUpdateVoucherIsOpen: false,
      voucherUpdateSelected: null,
      vouchers: [],
      pagination: null,
      sortField: "id",
      sortDirection: "desc",
      code: "",
      limit: 5,
      page: 0,
      status: null,
    };
  },
  emits: ['succes'],
  props: {
    codeProp: {
      type: String,
      default: "",
    },
    statusProp: {
      type: Boolean,
      default: null,
    },
  },
  watch: {
    codeProp(newCode) {
      this.code = newCode;
      this.handlegetVouchers();
    },
    statusProp(newStatus) {
      this.status = newStatus;
      this.handlegetVouchers();
    },
  },
  components: {
    TableComponent,
    UpdateVoucherComponent,
    Pagination,
    toggleButton,

  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  mounted() {
    this.handlegetVouchers();
  },
  methods: {
    truncate,
    formatCurrencyVN,
    async handlegetVouchers() {
      try {
        const param = {
          page: this.page,
          code: this.code,
          status: this.status,
          limit: this.limit,
          sort: `${this.sortField},${this.sortDirection}`,
        };
        const response = await getVouchers(param);
        this.pagination = response.data;
        this.vouchers = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },

    async handleChangeStatusVoucher(idVoucher) {
      try {
        const response = await changeStatusVoucher(idVoucher);
        notificationService.success(response.message);
        this.handlegetVouchers();
        this.$emit('succes')
      } catch (error) {
        console.error(error);
      }
    },

    handlePageChange(newPage) {
      this.page = newPage - 1;
      this.handlegetVouchers();
    },
    handleLimitChange(limitPanigation) {
      this.limit = limitPanigation;
      this.page = 0;
      this.handlegetVouchers();
    },
    async changeSort(column) {
      if (this.sortField === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortField = column;
        this.sortDirection = "asc";
      }
      await this.handlegetVouchers();
    },

    getSortIcon(column) {
      if (this.sortField === column) {
        return this.sortDirection === "asc"
          ? "<i class='bx bx-sort-a-z'></i>"
          : "<i class='bx bx-sort-z-a'></i>";
      }
      return "";
    },
    handleUpdateVoucherSelected(item) {
      this.voucherUpdateSelected = item;
      this.modalUpdateVoucherIsOpen = !this.modalUpdateVoucherIsOpen;
    },
  },
};
</script>