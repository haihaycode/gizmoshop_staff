<template>
    <div>
        <ImportAndExportFromExcelComponent :nameExport="'brand'" @file-ready-for-update="handleImportFileExcel">
        </ImportAndExportFromExcelComponent>
    </div>
</template>

<script>
import notificationService from '@/services/notificationService';
import ImportAndExportFromExcelComponent from '../fileTransfer/ImportAndExportFromExcelComponent.vue';
import { importFileExcel } from '@/api/exportAndImportApi';
export default {
    components: {
        ImportAndExportFromExcelComponent
    },
    methods: {
        async handleImportFileExcel(file) {
            try {
                const res = await importFileExcel('brand', file);
                notificationService.success(res.data.message);
                this.$emit('load');
            } catch (error) {
                console.error('lỗi khi import' + error)
            }
        }
    }
}
</script>

<style></style>