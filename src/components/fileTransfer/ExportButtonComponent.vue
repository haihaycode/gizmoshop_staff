<template>
    <div>
        <Button @click="handleExportAll" :icon="icon" :text="text" :color="color" :class="exportClass" />
    </div>
</template>

<script>
import Button from '../buttons/button.vue';

export default {
    name: 'ExportButtonComponent',
    components: {
        Button
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        exportClass: {
            type: String,
            default: ' bg-blue-500 rounded-sm hover:text-blue-500 hover:bg-white focus:ring-4 focus:ring-blue-300 transition duration-200'
        },
        icon: {
            type: String,
            default: `<i class='bx bxs-file-export text-lg mr-2' ></i>`
        },
        exportLink: {
            type: String,
            required: false,
            default: 'https://docs.google.com/spreadsheets/d/1LxnU0Hr_iitpMVYcLoqZGfPlWryCssWyXwuUnrhUv7A/export?format=xlsx'
        }
    },
    methods: {
        handleExportAll() {
            if (this.exportLink) {
                const link = document.createElement('a');
                link.href = this.exportLink;
                link.setAttribute('download', 'data-export.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.warn('Export link is not provided.');
            }
        }
    }
}
</script>
