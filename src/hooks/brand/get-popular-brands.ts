import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { IPopularBrand } from "@/types";

interface PopularBrandResponse {
    data: IPopularBrand[];
    error: string | null;
    status: number;
}

export const useGetPopularBrands = () => {
    return useQuery<PopularBrandResponse, Error>({
        queryKey: ["popularBrand"],
        queryFn: async () => {
            const res = await request.get<PopularBrandResponse>(`/brand/popular/all`);
            return res.data;
        },
        enabled: true,
    });
};
