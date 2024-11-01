import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getProduct = async (reqData) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/product/list`, { params: reqData });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};