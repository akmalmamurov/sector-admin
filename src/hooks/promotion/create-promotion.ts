import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
import { PromotionRequest } from "@/types";

const createPromotion = async (data: FormData): Promise<PromotionRequest> => {
    const res = await request.post<PromotionRequest>("/promotion/create", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const useCreatePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation<PromotionRequest, AxiosError, FormData>({
        mutationFn: createPromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotion"] });
            toast.success("Created successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
