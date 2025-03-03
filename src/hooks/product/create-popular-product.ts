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
        message: string;
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

export const useCreateToggleProduct = () => {
    const queryClient = useQueryClient();
    return useMutation<PopularProductResponse, AxiosError, string[]>({
        mutationFn: createPopularProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["product", true] });
            toast.success(data.data?.message);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};