<template>
  <div>
    <TableComponent :items="listBrandData" :loading="isLoading">
      <!-- Header Slot -->
      <template #header>
        <th @click="changeSort('id')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          STT <span v-html="getSortIcon('id')"></span>
        </th>
        <th @click="changeSort('name')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          THƯƠNG HIỆU <span v-html="getSortIcon('name')"></span>
        </th>
        <th @click="changeSort('description')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          MÔ TẢ <span v-html="getSortIcon('description')"></span>
        </th>
        <th @click="changeSort('deleted')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          TRẠNG THÁI <span v-html="getSortIcon('deleted')"></span>
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">
          XUẤT
        </th>
      </template>

      <!-- Body Slot -->
      <template #body>
        <tr v-for="(item, index) in listBrandData" :key="index" @click="handleUpdateBrandSelected(item)"
          class="hover:bg-gray-300 cursor-pointer">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ item.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ item.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.description }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <toggleButton :is-toggled="!item.deleted" @update:isToggled="handleActive(item.id)" @click.stop />
          </td>
          <td>
            <ExportButtonComponent @click.stop :nameExport="'brand'" :idExport="item.id">
            </ExportButtonComponent>
          </td>
        </tr>
      </template>

      <template #footer>
        <td colspan="4"></td>
      </template>

      <template #pagination>
        <div>
          <Pagination :total-items="pagination?.totalElements" :items-per-page="limit" :current-page="page + 1"
            @page-changed="handlePageChange" @limit-changed="handleLimitChange" />
        </div>
      </template>
    </TableComponent>

    <UpdateBrandComponent v-if="idBrandSelected" :brand="listBrandData.find((item) => item.id === idBrandSelected)"
      :isOpen="modalUpdateBrandIsOpen" @close="modalUpdateBrand" @update-success="loadBrand" />

    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
      @close="NotificationModalIsOpen = false" :title="'Thông báo'" />
  </div>
</template>

<script>
import TableComponent from "../table/TableComponent.vue";
import { getBrand, changeActive } from "@/api/brandApi.js";
import Pagination from "../pagination/Pagination.vue";
import UpdateBrandComponent from "./UpdateBrandComponent.vue";
import toggleButton from "../buttons/toggleButton.vue";
import NotificationModal from "../modal/NotificationModal.vue";
import { mapGetters } from "vuex";
import ExportButtonComponent from "../fileTransfer/ExportButtonComponent.vue";
export default {
  name: "listBrand",
  data() {
    return {
      NotificationModalIsOpen: false,
      listBrandData: [],
      pagination: null,
      sortField: "id",
      sortDirection: "desc",
      name: "",
      deleted: null,
      limit: 5,
      page: 0,
      idBrandSelected: null,
      modalUpdateBrandIsOpen: false,
      message: "",
      messageType: "",
    };
  },
  props: {
    nameProp: {
      type: String,
      default: "",
    },
    deletedProp: {
      type: Boolean,
      default: null,
    },
  },
  watch: {
    nameProp(newName) {
      console.log("nameProp changed:", newName);
      this.name = newName;
      this.handleGetBrand();
    },
    deletedProp(newDeleted) {
      console.log("deletedProp changed:", newDeleted);
      this.deleted = newDeleted;
      this.handleGetBrand();
    },
  },
  components: {
    UpdateBrandComponent,
    TableComponent,
    toggleButton,
    Pagination,
    NotificationModal,
    ExportButtonComponent
  },
  mounted() {
    this.handleGetBrand();
  },
  computed: {
    ...mapGetters("loading", ["isLoading"]),
  },
  methods: {
    async handleGetBrand() {
      try {
        const param = {
          name: this.name,
          deleted: this.deleted,
          page: this.page,
          limit: this.limit,
          sort: `${this.sortField},${this.sortDirection}`,
        };
        const response = await getBrand(param);
        this.pagination = response.data;
        this.listBrandData = response.data.content;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
        this.message = "Có lỗi xảy ra khi tải dữ liệu thương hiệu.";
        this.messageType = "error";
        this.NotificationModalIsOpen = true;
      }
    },
    handlePageChange(newPage) {
      this.page = newPage - 1;
      this.handleGetBrand();
    },
    handleLimitChange(limitPagination) {
      this.limit = limitPagination;
      this.page = 0;
      this.handleGetBrand();
    },
    async changeSort(column) {
      if (this.sortField === column) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortField = column;
        this.sortDirection = "asc";
      }
      await this.handleGetBrand();
    },
    getSortIcon(column) {
      if (this.sortField === column) {
        return this.sortDirection === "asc"
          ? "<i class='bx bx-sort-a-z'></i>"
          : "<i class='bx bx-sort-z-a'></i>";
      }
      return "";
    },
    handleUpdateBrandSelected(item) {
      this.idBrandSelected = item.id;
      this.modalUpdateBrandIsOpen = true;
    },
    modalUpdateBrand() {
      this.modalUpdateBrandIsOpen = false;
      this.idBrandSelected = null;
    },
    loadBrand() {
      this.handleGetBrand();
    },
    async handleActive(id) {
      try {
        const res = await changeActive(id);
        this.message = res.data?.message || "Thương hiệu đã được cập nhật"; // Thông báo mặc định
        this.messageType = "success";
        this.NotificationModalIsOpen = true;
        this.$emit("create-success");
        this.handleGetBrand();
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái thương hiệu:", error);
        this.message = "Có lỗi xảy ra khi cập nhật trạng thái thương hiệu.";
        this.messageType = "error";
        this.NotificationModalIsOpen = true;
      }
    },
  },
};
</script>

<style scoped>
/* Thêm các style nếu cần */
</style>
