<template>
  <div class="flex items-center">
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only" v-model="localToggled" @change="handleToggle" />
      <div class="w-12 h-6 rounded-full transition-colors duration-300"
        :class="localToggled ? 'bg-[#1c4b7a]' : 'bg-gray-300'"></div>
      <span class="absolute left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300"
        :class="{ 'translate-x-full': localToggled }"></span>
    </label>
    <span class="ml-2 font-medium" :class="{ 'text-[#1c4b7a]': localToggled, 'detrong': !localToggled }">
      {{ localToggled ? 'Đang hoạt động' : 'Không hoạt động' }}
    </span>

    <sweetalert2Modal :title="title" :text="text" :icon="icon" :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText" @close="closeAlert" ref="sweetalert2Modal">
    </sweetalert2Modal>
  </div>
</template>

<script>
import sweetalert2Modal from '../modal/sweetalert2Modal.vue';

export default {
  props: {
    isToggled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Xác nhận',
    },
    text: {
      type: String,
      default: 'Bạn có chắc chắn muốn thay đổi trạng thái?',
    },
    icon: {
      type: String,
      default: 'warning', // 'warning', 'error', 'success', 'info', 'question'
    },
    confirmButtonText: {
      type: String,
      default: 'Đồng ý',
    },
    cancelButtonText: {
      type: String,
      default: 'Hủy',
    },
  },
  components: {
    sweetalert2Modal
  },
  data() {
    return {
      localToggled: this.isToggled
    };
  },
  watch: {
    isToggled(newValue) {
      this.localToggled = newValue;
    }
  },
  methods: {
    handleToggle() {
      if (this.localToggled !== this.isToggled) {
        this.$refs.sweetalert2Modal.showAlert();
      }
    },
    closeAlert(data) {
      if (data === "confirm") {
        this.$emit('update:isToggled', this.localToggled);
      } else {
        this.localToggled = this.isToggled;
      }
    },
  }
};
</script>

<style scoped>
</style>
