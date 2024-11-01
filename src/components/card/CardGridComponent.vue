<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div v-if="loading" class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <div class="animate-pulse flex space-x-4">
                <div class="flex-1 h-48 bg-gray-200 rounded-sm"></div>
                <div class="flex-1 h-48 bg-gray-200 rounded-sm"></div>
                <div class="flex-1 h-48 bg-gray-200 rounded-sm"></div>
                <div class="flex-1 h-48 bg-gray-200 rounded-sm"></div>
            </div>
        </div>
        <div v-else-if="!loading && (!items || items.length === 0)"
            class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center">
            <p class="text-gray-500">Không có dữ liệu</p>
        </div>
        <div v-else v-for="(item, index) in items" :key="index" @focus="isFocused = index" @blur="isFocused = null"
            tabindex="0"
            :class="['shadow-lg', 'rounded-lg', 'overflow-hidden', 'transition-transform', 'transform', 'hover:scale-105', !item.active ? 'bg-red-500 text-white' : 'bg-blue-500 text-white', isFocused === index ? 'opacity-50' : '']"
            @click="emitItem(item)">
            <img v-if="item.image" :src="item.image" alt=".." class="w-full h-48 object-cover" />
            <div class="p-4">
                <div class="mt-2">
                    <span v-html="icon" class="mr-2"></span>
                    <div v-for="(value, key) in item" :key="key" :class="!item.active ? 'text-white' : ''"
                        class="cursor-pointer">
                        {{ excludedKeys.includes(key) ? '' : value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardGrid',
    props: {
        icon: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        excludedKeys: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isFocused: null
        }
    },
    methods: {
        emitItem(item) {
            this.$emit('item-clicked', item);
        }
    }
}
</script>

<style scoped>
/* Optional custom styles for your component */
</style>
