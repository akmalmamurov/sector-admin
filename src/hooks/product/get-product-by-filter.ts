import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { ProductData } from "@/types";

export interface IProductResponse {
    data: {
        products: ProductData[];
        total: number;
        totalPages: number;
        limitNumber: number;
        pageNumber: number;
    }
    error: null;
    status: number;
}

interface ProductFilterParams {
    page?: number;
    limit?: number;
    title?: string;
    productCode?: string;
}

const fetchData = async (params: ProductFilterParams): Promise<IProductResponse> => {
    const res = await request.get<IProductResponse>("/product/filter", { params });
    return res.data;
};

export const useGetProductByFilter = (params: ProductFilterParams) => {
    return useQuery<IProductResponse, Error>({
        queryKey: ["product", params],
        queryFn: () => fetchData(params),
    });
};
