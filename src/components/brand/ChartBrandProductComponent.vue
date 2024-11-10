<template>
    <div class="flex flex-col items-center bg-white  rounded-sm p-6 mb-3 mt-4">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê số lượng sản phẩm từng thương hiệu</h2>

        <div v-if="loading" class="flex justify-center items-center h-60 w-full">
            <span class="loader"></span>
        </div>

        <div class="overflow-x-auto w-full mb-6" :class="loading ? 'hidden' : 'block'">
            <canvas ref="barChart" class="w-full h-60"></canvas>
        </div>

        <div class="flex items-center justify-between w-full mb-4" :class="loading ? 'hidden' : 'block'">
            <div class="flex items-center space-x-4">
                <Button :text="''" :icon="`<i class='bx bxs-chevron-right bx-rotate-180'></i>`" @click="prevPage"
                    :disabled="currentPage === 0"
                    class="px-4 py-2  text-white    transition-colors disabled:bg-gray-300 disabled:text-gray-500">
                </Button>
                <Button :text="''" :icon="`<i class='bx bxs-chevron-right'></i>`" @click="nextPage"
                    :disabled="currentPage >= totalPages - 1"
                    class="px-4 py-2  text-white    transition-colors disabled:bg-gray-300 disabled:text-gray-500">
                </Button>
            </div>
            <span class="text-md font-semibold text-gray-600">
                Trang {{ currentPage + 1 }} / {{ totalPages }}
            </span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import { fetchBrandProductCounts } from '@/api/brandApi';
import Button from '../buttons/button.vue';
import { mapGetters } from 'vuex';
Chart.register(...registerables);

export default {
    name: 'ChartCategories',
    components: {
        Button,
    },
    computed: {
        ...mapGetters("loading", ["isLoading"]),
    },
    setup() {
        const barChart = ref(null);
        const data = ref([]);
        const currentPage = ref(0);
        const itemsPerPage = ref(3);
        const loading = ref(true);
        let myChart = null;

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                itemsPerPage.value = 9;
            } else if (window.innerWidth >= 768) {
                itemsPerPage.value = 6;
            } else { // Màn hình di động
                itemsPerPage.value = 3;
            }
        };
        onMounted(() => {
            handleResize();
            window.addEventListener('resize', handleResize);
            loadChartData();
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });

        const paginatedData = computed(() => {
            const start = currentPage.value * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return data.value.slice(start, end);
        });
        const totalPages = computed(() => {
            return Math.ceil(data.value.length / itemsPerPage.value);
        });

        const loadChartData = async () => {
            try {
                const res = await fetchBrandProductCounts();
                data.value = res.data;
                createChart();
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                loading.value = false;
            }
        };

        const createChart = () => {
            const ctx = barChart.value.getContext('2d');
            const maxYValue = Math.max(...paginatedData.value.map(item => item.quantity)) + 5;
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: paginatedData.value.map(item => item.name),
                    datasets: [{
                        label: 'Tổng sản phẩm',
                        data: paginatedData.value.map(item => item.quantity),
                        backgroundColor: 'rgba(255, 165, 0, 0.5)',
                        borderColor: 'rgba(255, 165, 0, 1)',
                        borderWidth: 0.5,
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: maxYValue,
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
                                text: 'Thương Hiệu',
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
                        tooltip: {
                            callbacks: {
                                title: () => 'Thông tin chi tiết sản phẩm',
                                label: (tooltipItem) => {
                                    const category = paginatedData.value[tooltipItem.dataIndex];
                                    const total = category.quantity;
                                    const active = category.quantityActive;
                                    const inactive = total - active;

                                    return [
                                        `Tổng số lượng: ${total}`,
                                        `Số lượng đang kích hoạt: ${active}`,
                                        `Số lượng bị ẩn: ${inactive}`
                                    ];
                                }
                            }
                        }
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
            },
            loading
        };
    },
};
</script>

<style scoped>
canvas {

    height: 200px;
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4a90e2;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
