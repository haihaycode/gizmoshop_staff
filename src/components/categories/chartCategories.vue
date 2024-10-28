<template>
    <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê số lượng sản phẩm từng danh mục</h2>

        <div class="overflow-x-auto w-full mb-6">
            <canvas ref="barChart" class="w-full h-60"></canvas>
        </div>

        <div class="flex items-center justify-between w-full mb-4">
            <div class="flex items-center space-x-4">
                <Button :text="''" :icon="`<i class='bx bxs-chevron-right bx-rotate-180'></i>`" @click="prevPage"
                    :disabled="currentPage === 0"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500">
                    Trang trước
                </Button>

                <Button :text="''" :icon="`<i class='bx bxs-chevron-right'></i>`" @click="nextPage"
                    :disabled="currentPage >= totalPages - 1"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500">
                    Trang sau
                </Button>
            </div>

            <span class="text-md font-semibold text-gray-600">
                Trang {{ currentPage + 1 }} / {{ totalPages }}
            </span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { fetchCategoryProductCounts } from '@/api/categoriesApi';
import Button from '../buttons/button.vue';

Chart.register(...registerables);

export default {
    name: 'ChartCategories',
    components: {
        Button,
    },
    setup() {
        const barChart = ref(null);
        const data = ref([]);
        const currentPage = ref(0);
        const itemsPerPage = 6;
        let myChart = null;

        const paginatedData = computed(() => {
            const start = currentPage.value * itemsPerPage;
            const end = start + itemsPerPage;
            return data.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(data.value.length / itemsPerPage);
        });

        const loadChartData = async () => {
            try {
                const res = await fetchCategoryProductCounts();
                data.value = res.data;

                createChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const createChart = () => {
            const ctx = barChart.value.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: paginatedData.value.map(item => item.name),
                    datasets: [{
                        label: 'Tổng sản phẩm',
                        data: paginatedData.value.map(item => item.quantity),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(100, 192, 192, 1)',
                        borderWidth: 0.5,
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Số lượng sản phẩm',
                                font: { size: 14 },
                                color: '#333',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Danh Mục',
                                font: { size: 14 },
                                color: '#333',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#333',
                                font: { size: 14 },
                            },
                        },
                    },
                },
            });
        };

        const updateChart = () => {
            if (myChart) {
                myChart.data.labels = paginatedData.value.map(item => item.name);
                myChart.data.datasets[0].data = paginatedData.value.map(item => item.quantity);
                myChart.update();
            }
        };

        onMounted(loadChartData);

        watch([data, currentPage], () => {
            updateChart();
        });

        return {
            barChart,
            currentPage,
            totalPages,
            nextPage() {
                if (currentPage.value < totalPages.value - 1) currentPage.value++;
            },
            prevPage() {
                if (currentPage.value > 0) currentPage.value--;
            }
        };
    },
};
</script>

<style scoped>
canvas {
    height: 200px;
}
</style>
