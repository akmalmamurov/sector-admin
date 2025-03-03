import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_POPULAR_PRODUCT } from "@/constants";
import { toast } from "react-toastify";
interface PopularProductResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        productIds: string[];
    };
}

const createPopularProduct = async (
    productIds: string[]
): Promise<PopularProductResponse> => {
    const data = { productIds };

    const res = await request.post<PopularProductResponse>(
        CREATE_POPULAR_PRODUCT,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

export const useCreatePopularProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<PopularProductResponse, AxiosError, string[]>({
        mutationFn: createPopularProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product", true] });
            toast.success("Created Popular product successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};