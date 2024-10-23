// currencyUtils.js

export const formatCurrencyVN = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
