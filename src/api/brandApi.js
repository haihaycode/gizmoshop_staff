import Axios from "@/api/axios";
import { HOST } from "@/api/config";

// lấy về danh sách brand phân trang và tham số truyền đi
export const getListBrand = async (params) => {
  try {
    const response = await Axios.get(`${HOST}/api/public/brand/list`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getBrand = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/brand`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const createBrand = async (brandNew) => {
  try {
    const response = await Axios.post(`${HOST}/api/public/brand/create`, brandNew);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
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

// lấy số lượng sản phẩm của từng thương hiệu
export const fetchBrandProductCounts = async () => {
  try {
    const response = await Axios.get(`${HOST}/api/public/brand/stats`);
    return response.data;
  } catch (error) {
    throw new Error(` ${error}`);
  }
};
