<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2 ">

        <div class="p-4 bg-white bg-opacity-70 rounded-sm shadow-md flex flex-col justify-between hover:bg-gray-300">
            <div class="flex justify-between items-center">
                <i class="bx bx-home text-2xl text-yellow-500"></i>
            </div>
            <div class="mt-4">
                <p class="text-2xl font-bold transition ease-in-out duration-500 transform hover:scale-x-105">
                    {{ animatedCount }} +
                </p>
                <p class="text-gray-500">Tổng số mã giảm giá</p>
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
                <p class="text-gray-500">Mã giảm giá đang hoạt động</p>
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
                <p class="text-gray-500">Mã giảm giá không hoạt động</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getVouchersCard } from '@/api/voucherApi';

export default {
    name: 'StatisticsCards',
    data() {
        return {
            voucher: [],
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
                const arr = await getVouchersCard();
                this.voucher = arr.data;

                const totalWarehouses = this.voucher.length;
                const activeWarehouses = this.voucher.filter(item =>
                    item.status === true &&
                    item.hasRemainingDays === true &&
                    item.hasRemainingUses === true
                ).length;

                const inactiveWarehouses = totalWarehouses - activeWarehouses;


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
                this[property] = Math.floor(current);
            }, 10);
        }
    }
};
</script>

<style scoped></style>
