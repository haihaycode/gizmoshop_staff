<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <orderClientComponent></orderClientComponent>
    </div>
</template>

<script>
import orderClientComponent from '@/components/order/orderClientComponent.vue';
export default {
    name: "orderClient",
    components: {
        orderClientComponent
    }

}
</script>

<style></style>