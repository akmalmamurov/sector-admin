import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { ProductData, ProductResponse } from "@/types";

interface Filters {
    recommended?: boolean;
    popular?: boolean;
    condition?: boolean;
    relevance?: boolean;
}

const fetchData = async (filters: Filters): Promise<ProductData[]> => {
    const res = await request.get<ProductResponse>(`/product`,{
        params: filters,
    });
    return res.data.data;
};

export const useGetPopularProducts = (filters: Filters) => {
    return useQuery<ProductData[], Error>({
        queryKey: ["product", filters],
        queryFn: () => fetchData(filters),
    });
};
