<template>
    <div>
        <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Thêm sản phẩm vào kho <span class="text-blue-500">{{
                    inventory?.inventoryName
                        }}</span> </h3>
            </template>

            <template #body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas rerum quibusdam magni, iure repellat,
                dolor optio quis id neque vero beatae laboriosam accusamus numquam sequi minima praesentium architecto
                corrupti. Placeat.


                <div class="flex justify-end">
                    <Button :is-Loading="isLoading" :text="'Lưu'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                    </Button>
                </div>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import Button from '../buttons/button.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'addNewProductComponent',
    components: {
        ModalBox,
        Button
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: Object,
            required: false
        },

    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style></style>