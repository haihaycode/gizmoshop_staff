import dayjs from 'dayjs';


// currencyUtils.js
export const formatCurrencyVN = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};


// dateUtils.js
export const formatDay = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
};