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