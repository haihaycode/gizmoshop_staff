<template>
    <div>
        <div class="table-container overflow-x-auto">
            <table class="min-w-full border-collapse table-auto">

                <thead>
                    <tr class="bg-[#113254]">
                        <slot name="header"></slot>
                    </tr>
                </thead>


                <tbody class="bg-white">
                    <tr v-if="loading">
                        <td colspan="100%" class="text-center py-4"><i class='bx bx-loader-alt bx-spin'></i><span> Đang tải dữ liệu....</span></td>
                    </tr>
                    <tr v-if="!items || items.length === 0 && !loading">
                        <td colspan="100%" class="text-center py-4">Không có dữ liệu</td>
                    </tr>
                    <template v-else>
                        <slot name="body"></slot>
                    </template>
                </tbody>


                <tfoot v-if="$slots.footer">
                    <tr>
                        <slot name="footer"></slot>
                    </tr>
                </tfoot>
            </table>



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

<style scoped>
::-webkit-scrollbar {
    width: 8px;

    height: 8px;

}

::-webkit-scrollbar-thumb {
    background-color: #88888855;

    border-radius: 2px;

}

::-webkit-scrollbar-thumb:hover {
    background-color: #55555593;

}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}
</style>
