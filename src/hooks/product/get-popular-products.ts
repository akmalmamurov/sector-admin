import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { ProductData, ProductResponse } from "@/types";

const fetchData = async (popular: boolean = false): Promise<ProductData[]> => {
    const res = await request.get<ProductResponse>(`/product?popular=${popular}`);
    return res.data.data;
};

export const useGetPopularProducts = (popular: boolean) => {
    return useQuery<ProductData[], Error>({
        queryKey: ["product", popular],
        queryFn: () => fetchData(popular),
    });
};
