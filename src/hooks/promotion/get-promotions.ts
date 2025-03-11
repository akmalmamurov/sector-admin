import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { PromotionData, PromotionResponse } from "@/types";

const fetchData = async (): Promise<PromotionData[]> => {
    const res = await request.get<PromotionResponse>("/promotion/all");
    return res.data.data;   
};

export const useGetPromotions = () => {
    return useQuery<PromotionData[], Error>({
        queryKey: ["promotion"],
        queryFn: fetchData,
    });
};
