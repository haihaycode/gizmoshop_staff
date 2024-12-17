<script>
import Swal from 'sweetalert2';

export default {
  name: 'sweetalert2Component',
  props: {
    title: {
      type: String,
      default: 'Thông báo',
    },
    text: {
      type: String,
      default: 'Đây là nội dung thông báo!',
    },
    icon: {
      type: String,
      default: 'success', // 'warning', 'error', 'success', 'info', 'question'
    },
    confirmButtonText: {
      type: String,
      default: 'Xác nhận',
    },
    cancelButtonText: {
      type: String,
      default: 'Hủy',
    },
  },
  methods: {
    showAlert() {
      Swal.fire({
        title: this.title,
        text: this.text,
        icon: this.icon,
        showCancelButton: true,
        confirmButtonText: this.confirmButtonText,
        cancelButtonText: this.cancelButtonText,
      }).then((result) => {
        const action = result.isConfirmed ? 'confirm' : 'cancel';
        this.$emit('close', action);
      });
    },
  },
};
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
