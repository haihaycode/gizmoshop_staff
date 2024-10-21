import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getCategories = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/categories`,
            { params: params }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
}; export const changeActive = async (idCategory) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/changeactive/${idCategory}`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const createCategory = async (dataCategory) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/categories/create`, {
            params: dataCategory
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};