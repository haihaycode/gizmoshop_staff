<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">

        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-home text-2xl text-yellow-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ animatedCount }} +
                </p>
                <p class="text-gray-500">Tổng số danh mục</p>
            </div>
        </div>


        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-check-circle text-2xl text-green-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ activeCount }} +
                </p>
                <p class="text-gray-500">Danh mục đang hoạt động</p>
            </div>
        </div>

        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-x-circle text-2xl text-red-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ inactiveCount }} +
                </p>
                <p class="text-gray-500">Danh mục không hoạt động</p>
            </div>
        </div>
    </div>
</template>

<script>
import { listCategories } from '@/api/categoriesApi';

export default {
    name: 'StatisticsCards',
    data() {
        return {
            categories: [],
            animatedCount: 0,
            activeCount: 0,
            inactiveCount: 0
        };
    },
    mounted() {
        this.getArr();
    },
    methods: {
        async getArr() {
            try {
                const arr = await listCategories();
                this.categories = arr.data;

                const totalWarehouses = this.categories.length;
                const activeWarehouses = this.categories.filter(item => item.active).length;
                const inactiveWarehouses = totalWarehouses - activeWarehouses;

                // Animate all counts
                this.animateCount(totalWarehouses, 'animatedCount');
                this.animateCount(activeWarehouses, 'activeCount');
                this.animateCount(inactiveWarehouses, 'inactiveCount');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        animateCount(targetNumber, property) {
            let current = 0;
            const increment = targetNumber / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    clearInterval(interval);
                    current = targetNumber;
                }
                this[property] = Math.floor(current); // Update the specific property (animatedCount, activeCount, inactiveCount)
            }, 10);
        }
    }
};
</script>

<style scoped></style>
