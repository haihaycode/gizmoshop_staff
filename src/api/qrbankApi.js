import Axios from "@/api/axios";
// import { HOST } from "@/api/config";



export const createQRBank = async (data) => {
    try {
        const response = await Axios.post(`https://open.oapi.vn/banking/generate-qr`, data);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};