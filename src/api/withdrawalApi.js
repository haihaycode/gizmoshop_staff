import Axios from '@/api/axios';
import { HOST } from '@/api/config'

export const getAllTransaction = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/withdrawalhistory/filter-by-auth-status`,
            { params: params }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const updateStatusTransaction = async (idTransaction, data) => {
    try {
        const response = await Axios.put(`${HOST}/api/public/withdrawalhistory/${idTransaction}/update-status`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const transactionNotification = async (params) => {
    try {
        const response = await Axios.get(`${HOST}/api/public/withdrawalhistory/withdrawals/pending`, {
          params: params,
        });
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};