<template>
  <div>
    <TableComponent>
      <!-- Header Slot -->
      <template #header>
        <th
          @click="changeSort('id')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
        >
         STT <span v-html="getSortIcon('id')"></span>
        </th>
        <th
          @click="changeSort('name')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
        >
          THƯƠNG HIỆU<span v-html="getSortIcon('name')"></span>
        </th>
        <th
          @click="changeSort('description')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
        >
          MÔ TẢ<span v-html="getSortIcon('description')"></span>
        </th>

        <th
          @click="changeSort('deleted')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
        >
          TRẠNG THÁI<span v-html="getSortIcon('deleted')"></span>
        </th>
      </template>
      <!-- Body Slot -->
      <template #body>
        <tr
          v-for="(item, index) in listBrandData"
          :key="index"
          class="hover:bg-gray-300"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ item.id }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ item.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.description }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <toggleButton
              :is-toggled="item.deleted"
              @update:isToggled="updateStatusInventory(item.id)"
            >
            </toggleButton>
          </td>
        </tr>
      </template>

      <template #footer>
        <td colspan="8"></td>
      </template>

      <template #pagination>
        <div>
          <Pagination
            :total-items="pagination?.totalElements"
            :items-per-page="limit"
            :current-page="page + 1"
            @page-changed="handlePageChange"
            @limit-changed="handleLimitChange"
          ></Pagination>
        </div>
      </template>
    </TableComponent>
    <!-- update -->
    <!-- <updateInventory v-if="idInventorySelected" :id="idInventorySelected" :isOpen="ModalUpdateInventoryIsOpen"
            @close="updateInventoryModal" @update-success="loadInventory">
        </updateInventory> -->
  </div>
</template>
<script>
import TableComponent from "../table/TableComponent.vue";
import { getBrand } from "@/api/brandApi.js";
import Pagination from "../pagination/Pagination.vue";
export default {
  name: "listBrand",
  data() {
    return {
      listBrandData: [],
      pagination: null,
      sortField: "id",
      sortDirection: "desc",
      limit: 5,
      page: 0,
      name: "",
      deleted: null,
    };
  },
  components: {
    TableComponent,
    Pagination,
  },
  mounted() {
    this.handleGetBrand();
  },
  methods: {
    async handleGetBrand() {
      try {
        const param = {
          page: this.page,
          name: this.name,
          deleted: this.deleted,
          limit: this.limit,
          sort: `${this.sortField},${this.sortDirection}`,
        };
        const response = await getBrand(param);
        this.pagination = response.data;
        this.listBrandData = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },
    handlePageChange(newPage) {
      this.page = newPage - 1;
      this.handleGetBrand();
    },
    handleLimitChange(limitPanigation) {
      this.limit = limitPanigation;
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
  },
};
</script>
