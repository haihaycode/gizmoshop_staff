<template>
    <div>
        <h1>Biểu Đồ Tổng Sản Phẩm Theo Danh Mục</h1>
        <chartComponent :data="data" title="Biểu Đồ Sản Phẩm" xAxisLabel="Danh mục" yAxisLabel="Tổng sản phẩm"
            dataLabel="Sản phẩm" />

    </div>
</template>

<script>
import chartComponent from '@/components/chart/chartComponent.vue'; // Nhập component BarChart

export default {
    name: 'testComponent',
    components: {
        chartComponent,
    },
    data() {
        return {
            data: [
                { name: 'Danh mục 1', totalProducts: 10 },
                { name: 'Danh mục 2', totalProducts: 20 },
                { name: 'Danh mục 3', totalProducts: 30 },
            ],
        };
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
