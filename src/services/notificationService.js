// services/notificationService.js
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Khởi tạo Notyf với các tùy chọn thiết kế
const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
    ripple: true,
    types: [
        { type: 'success', background: '#d1e7dd' },
        { type: 'error', background: '#ffcccc' },
        { type: 'info', background: '#dbeafe' },
        { type: 'warning', background: '#fff4cd' }
    ]
});


function createNotification({ type, message, background, iconClass }) {
    const notification = notyf.open({
        type,
        message,
        background,
    });

    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.style.marginRight = '10px';
    icon.style.fontSize = '20px';
    icon.style.verticalAlign = 'middle';
    notification.target.prepend(icon);
}

export default {
    success(message = 'Thành công!') {
        createNotification({
            type: 'success',
            message,
            background: '#10b981',
            iconClass: 'bx bxs-check-circle'
        });
    },

    error(message = 'Có lỗi xảy ra!') {
        createNotification({
            type: 'error',
            message,
            background: '#ff4c4c',
            iconClass: 'bx bxs-error'
        });
    },

    info(message = 'Thông tin!') {
        createNotification({
            type: 'info',
            message,
            background: '#3b82f6',
            iconClass: 'bx bxs-info-circle'
        });
    },

    warning(message = 'Cảnh báo!') {
        createNotification({
            type: 'warning',
            message,
            background: '#f59e0b',
            iconClass: 'bx bxs-bug'
        });
    }
};
