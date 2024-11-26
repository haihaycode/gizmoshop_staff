import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getListProductAuthor = async (id, data) => {
    try {
        const response = await Axios.get(`${HOST}/api/admin/product/author/${id}`, { params: data });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const getListSupplier = async (data) => {
    try {
        const response = await Axios.get(`${HOST}/api/admin/list/supplier`, { params: data });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateStatusSupplier = async (id, data) => {
    try {
        const response = await Axios.put(
            `${HOST}/api/admin/approve-supplier/${id}`, null,
            { params: data }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const approveOrder = async (id, data) => {
    try {
        const response = await Axios.put(
            `${HOST}/api/admin/approve-order/${id}`, null,
            { params: data }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const approveorderfinal = async (orderId, data) => {
    try {
        const response = await Axios.patch(
            `${HOST}/api/admin/approve-order-final/${orderId}`, null,
            { params: data }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};


