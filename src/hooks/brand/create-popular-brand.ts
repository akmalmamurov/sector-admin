import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_POPULAR_BRAND } from "@/constants";
import { toast } from "react-toastify";
interface PopularBrandResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        brandIds: string[];
    };
}

const createPopularBrand = async (
    brandIds: string[]
): Promise<PopularBrandResponse> => {
    const data = { brandIds };

    const res = await request.post<PopularBrandResponse>(
        CREATE_POPULAR_BRAND,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

export const useCreatePopularBrand = () => {
    const queryClient = useQueryClient();
    return useMutation<PopularBrandResponse, AxiosError, string[]>({
        mutationFn: createPopularBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brand", true] });
            toast.success("Created Popular brand successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};