import { HOST } from "@/api/config";

export const loadImageCategory = (imageName) => {
    return `${HOST}/api/public/image/load/category/${imageName}`
}