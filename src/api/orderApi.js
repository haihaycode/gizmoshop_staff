import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getListAllOrder = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/orderall`, {
            params: params,
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const getAllStatusOrder = async (type) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/orders/status`, {
            params: type,
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};