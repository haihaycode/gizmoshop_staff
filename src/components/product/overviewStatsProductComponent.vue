<template>
    <div class="flex flex-col items-center bg-white  rounded-sm p-6 mb-3 mt-4">
        <h2 class="text-xl font-bold mb-4 text-gray-800">Thống kê top sản phẩm</h2>
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
import { getTopProduct } from '@/api/productApi';
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
                const res = await getTopProduct();
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

            // Lấy các giá trị từ paginatedData
            const ids = paginatedData.value.map(item => item.product.id);
            const views = paginatedData.value.map(item => item.view);
            const quantities = paginatedData.value.map(item => item.quantity);
            const favorites = paginatedData.value.map(item => item.favorite);

            // Tính maxYValue bằng cách lấy giá trị cao nhất của tất cả các cột và cộng thêm 5
            const maxYValue = Math.max(...views, ...quantities, ...favorites) + 5;

            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ids, // Dùng id làm nhãn cho từng cột
                    datasets: [
                        {
                            label: 'Lượt xem',
                            data: views,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Số lượng',
                            data: quantities,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Yêu thích',
                            data: favorites,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: maxYValue,
                            title: {
                                display: true,
                                text: 'Giá trị',
                                font: { size: 14 },
                                color: '#333',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'ID sản phẩm',
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
                        // Tooltip tùy chỉnh hiển thị chi tiết sản phẩm
                        tooltip: {
                            callbacks: {
                                title: () => 'Thông tin chi tiết sản phẩm',
                                label: (tooltipItem) => {
                                    const product = paginatedData.value[tooltipItem.dataIndex].product;
                                    const total = quantities[tooltipItem.dataIndex];
                                    const active = product.productInventoryResponse.quantity;
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
                // Cập nhật nhãn với id sản phẩm
                myChart.data.labels = paginatedData.value.map(item => item.product.id);

                // Cập nhật dữ liệu cho từng cột
                myChart.data.datasets[0].data = paginatedData.value.map(item => item.view);       // Cột "Lượt xem"
                myChart.data.datasets[1].data = paginatedData.value.map(item => item.quantity);   // Cột "Số lượng"
                myChart.data.datasets[2].data = paginatedData.value.map(item => item.favorite);   // Cột "Yêu thích"

                // Tính lại maxYValue dựa trên dữ liệu mới
                const maxYValue = Math.max(
                    ...paginatedData.value.map(item => item.view),
                    ...paginatedData.value.map(item => item.quantity),
                    ...paginatedData.value.map(item => item.favorite)
                ) + 5;

                // Cập nhật max của trục y
                myChart.options.scales.y.max = maxYValue;

                // Cập nhật biểu đồ
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
