<template>
    <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 ">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê số lượng sản phẩm từng danh mục</h2>

        <div class="overflow-x-auto w-full mb-6">
            <canvas ref="barChart" class="w-full h-60"></canvas>
        </div>

        <div class="flex items-center justify-between w-full mb-4">
            <div class="flex items-center space-x-4">
                <Button :text="''" :icon="`<i class='bx bxs-chevron-right bx-rotate-180'></i>`" @click="prevPage"
                    :disabled="currentPage === 0" class="px-4 py-2   ">
                    Trang trước
                </Button>

                <Button :text="''" :icon="`<i class='bx bxs-chevron-right'></i>`" @click="nextPage"
                    :disabled="currentPage >= totalPages - 1" class="px-4 py-2">
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
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue';
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
        const itemsPerPage = ref(3);
        let myChart = null;


        const handleResize = () => {
            if (window.innerWidth >= 1024) { // Màn hình máy tính để bàn
                itemsPerPage.value = 9; // Hiển thị 9 mục
            } else if (window.innerWidth >= 768) { // Màn hình máy tính bảng
                itemsPerPage.value = 6; // Hiển thị 6 mục
            } else { // Màn hình di động
                itemsPerPage.value = 3; // Hiển thị 3 mục
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
                        backgroundColor: 'rgb(29, 78, 216)',
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
                                color: '#555',
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

        watch([data, currentPage], updateChart);

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
