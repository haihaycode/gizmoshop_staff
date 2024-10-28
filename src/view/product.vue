<template>
    <div class="p-2 bg-gray-200 bg-opacity-30 shadow-md shadow-black/5 lg:m-2 md:m-0">
        <listProductComponent></listProductComponent>
    </div>
</template>

<script>
import listProductComponent from '@/components/product/listProductComponent.vue';
export default {
    name: "productView",
    components: {
        listProductComponent
    }


}
</script>

<style></style>