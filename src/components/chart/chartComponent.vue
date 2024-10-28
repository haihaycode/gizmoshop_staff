<template>
    <div class="flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
        <canvas ref="barChart" class="w-full max-w-lg"></canvas>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
    name: 'BarChart',
    props: {
        data: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        xAxisLabel: {
            type: String,
            required: true,
        },
        yAxisLabel: {
            type: String,
            required: true,
        },
        dataLabel: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const barChart = ref(null);
        let myChart = null;

        onMounted(() => {
            const ctx = barChart.value.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: props.data.map(item => item.name),
                    datasets: [{
                        label: props.dataLabel,
                        data: props.data.map(item => item.quantity),
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: props.yAxisLabel,
                                font: {
                                    size: 14,
                                },
                                color: '#333',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: props.xAxisLabel,
                                font: {
                                    size: 14,
                                },
                                color: '#333',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#333',
                                font: {
                                    size: 14,
                                },
                            },
                        },
                    },
                },
            });
        });

        watch(() => props.data, (newData) => {
            if (myChart) {
                myChart.data.labels = newData.map(item => item.name);
                myChart.data.datasets[0].data = newData.map(item => item.totalProducts);
                myChart.update();
            }
        });

        return {
            barChart,
        };
    },
    
};
</script>
