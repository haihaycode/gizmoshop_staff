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
