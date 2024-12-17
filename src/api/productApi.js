import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getProductPage = async (reqData) => {
    try {
        const response = await Axios.get(`${HOST}/api/admin/product/list`, { params: reqData });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const getProductList = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/admin/product`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const getStatusProduct = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/list/status`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const createProduct = async (data) => {
    try {
        const response = await Axios.post(`${HOST}/api/admin/product/create`, data);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateProduct = async (idProduct, data) => {
    try {
        const response = await Axios.put(`${HOST}/api/admin/product/update/${idProduct}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updataImage = async (formData) => {
    try {
        const response = await Axios.post(`${HOST}/api/admin/product/updateimage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Lỗi API updataImage: ${error}`);
    }
};


export const fetchInventoryProductCounts = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/inventory/InventoryStats`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

// http://localhost:8081/api/admin/product/demo?month=1&year=2024&page=0
export const getTopProduct = async (data) => {
    try {
        const response = await Axios.get(`${HOST}/api/admin/product/top`, { params: data });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};