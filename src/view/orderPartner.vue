<template>
    <div class="bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 z-30 lg:m-2 md:m-0 p-2">
        <orderPartnerComponent></orderPartnerComponent>
    </div>
</template>

<script>
import orderPartnerComponent from '@/components/order/orderPartnerComponent.vue';
export default {
    name: 'orderPartner',
    components: {
        orderPartnerComponent
    }

}
</script>

<style></style>