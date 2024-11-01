// services/notificationService.js
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
    ripple: true,
    types: [
        { type: 'success', background: '#00A36C' },
        { type: 'error', background: '#FA5F55' },
        { type: 'info', background: '#6495ED' },
        { type: 'warning', background: '#E4D00A' }
    ]
});

// Hàm tạo thông báo có icon
function createNotification({ type, message, iconClass }) {
    notyf.open({
        type,
        message: `<i class="${iconClass} mr-2"></i> ${message}`,
    });
}

export default {
    success(message = 'Thành công!') {
        createNotification({
            type: 'success',
            message,
            iconClass: 'bx bxs-check-circle' // Icon thành công
        });
    },
    error(message = 'Có lỗi xảy ra!') {
        createNotification({
            type: 'error',
            message,
            iconClass: 'bx bxs-error' // Icon lỗi
        });
    },
    info(message = 'Thông tin!') {
        createNotification({
            type: 'info',
            message,
            iconClass: 'bx bxs-info-circle' // Icon thông tin
        });
    },
    warning(message = 'Cảnh báo!') {
        createNotification({
            type: 'warning',
            message,
            iconClass: 'bx bxs-bug' // Icon cảnh báo
        });
    }
};
