import { useQuery } from "@tanstack/react-query";
import request from "@/services";

import { ProductData, ProductResponse } from "@/types";

interface Filters {
  subcatalogId: string;
  catalogId: string;
}

const fetchData = async (filters: Filters): Promise<ProductData[]> => {
    const res = await request.get<ProductResponse>(`/product/by-catalog-id`,{
        params: filters,
    });
    return res.data.data;
};

export const useGetProductByCatalogId = (filters: Filters) => {
    return useQuery<ProductData[], Error>({
        queryKey: ["product-by-catalog-id", filters],
        queryFn: () => fetchData(filters),
    });

};
