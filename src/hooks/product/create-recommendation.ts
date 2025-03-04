import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_PRODUCT_RECOMMENDATION } from "@/constants";
import { toast } from "react-toastify";
interface ProductRecommendationResponse {
    success: boolean;
    message: string;
}

const createProductRecommendationToggle= async (
    productId: string
): Promise<ProductRecommendationResponse> => {
    const data = { productId };

    const res = await request.post<ProductRecommendationResponse>(
        CREATE_PRODUCT_RECOMMENDATION,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

export const useCreateProductRecommendationToggle = () => {
    const queryClient = useQueryClient();
        return useMutation<ProductRecommendationResponse, AxiosError, string>({
        mutationFn: createProductRecommendationToggle,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["product", {recommended: true}] });
            toast.success(data?.message);
        },
        onError: (error) => {   
            toast.error(`Error: ${error.message}`);
        },
    });
};