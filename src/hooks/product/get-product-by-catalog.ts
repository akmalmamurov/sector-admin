import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { ProductResponse } from "@/types";

interface Filters {
  subcatalogId: string;
  categoryId: string;
}

const fetchData = async (filters: Filters): Promise<ProductResponse> => {
    const res = await request.get<ProductResponse>(`/product/by-catalog-id`,{
        params: filters,
    });
    return res.data;
};

export const useGetProductByCatalogId = (filters: Filters) => {
    return useQuery<ProductResponse, Error>({
        queryKey: ["product-by-catalog-id", filters],
        queryFn: () => fetchData(filters),
    });
};
