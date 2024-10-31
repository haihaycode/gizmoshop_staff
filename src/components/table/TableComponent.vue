<template>
    <div>
        <div class="table-container overflow-x-auto">
            <table class="min-w-full border-collapse table-auto">
                <!-- Table Header -->
                <thead>
                    <tr class="bg-[#113254]">
                        <slot name="header"></slot>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody class="bg-white ">
                    <tr v-if="loading">
                        <td colspan="100%" class="text-center py-4">Đang tải ...</td>
                    </tr>
                    <tr v-else-if="!items || items.length === 0">
                        <td colspan="100%" class="text-center py-4">Không có dữ liệu</td>
                    </tr>
                    <template v-else>
                        <slot name="body"></slot>
                    </template>
                </tbody>

                <!-- Table Footer -->
                <tfoot v-if="$slots.footer">
                    <tr>
                        <slot name="footer"></slot>
                    </tr>
                </tfoot>
            </table>
            <!-- pagination -->


        </div>

        <div class="bg-white p-2 ">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableComponent",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped></style>
