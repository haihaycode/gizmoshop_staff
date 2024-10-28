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
};
export const listCategories = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/list/categories`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const getCategoriesID = async (idCategory) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/categories/${idCategory}`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const changeActive = async (idCategory) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/changeactive/${idCategory}`);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const createCategory = async (dataCategory) => {
    try {
        const response = await Axios.post(`${HOST}/api/public/categories/create`, dataCategory);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const updateInfoCategory = async (idCategory, formData) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/categories/update/${idCategory}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const updateImageCategory = async (idCategory, formData) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/categories/${idCategory}/updateimage`, formData);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
// lấy số lượng sản phẩm của từng danh mục
export const fetchCategoryProductCounts = async () => {
    try {
        const response = await Axios.get(`${HOST}/api/public/category-stats`);
        return response.data;
    } catch (error) {
        throw new Error(` ${error}`);
    }
};
