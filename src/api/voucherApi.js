import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getVouchers = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/voucher/`,
            { params: params }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const getVouchersCard = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/voucher/card`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// createVoucher
export const createVoucher = async (voucherNew) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/voucher/create`, voucherNew);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

//updateVoucher
export const updateVoucher = async (voucherUpdate) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/voucher/update/${voucherUpdate.id}`, voucherUpdate);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


// changeStatusVoucher

export const changeStatusVoucher = async (idVoucher) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/voucher/changestatus/${idVoucher}`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


// updateImageVoucher
export const changeImageVoucher = async (idVoucher, image) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/voucher/${idVoucher}/updateimage`, image);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

