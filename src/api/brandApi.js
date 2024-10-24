import Axios from "@/api/axios";
import { HOST } from "@/api/config";

export const getBrand = async (params) => {
  try {
    const response = await Axios.get(`${HOST}/api/public/brand/list`, {
      params: params,
    });
    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const createBrand = async (brandNew) => {
  try {
    const response = await Axios.post(
      `${HOST}/api/public/brand/create`,
      brandNew
    );
    return response.data; // Trả về dữ liệu phản hồi nếu thành công
  } catch (error) {
    console.log(error);
  }
};
export const updateBrand = async (brandUpdate) => {
  try {
    const response = await Axios.put(
      `${HOST}/api/public/brand/update/${brandUpdate.id}`,
      brandUpdate
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const changeActive = async (idBrand) => {
  try {
    const response = await Axios.put(
      `${HOST}/api/public/brand/changeactive/${idBrand}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
