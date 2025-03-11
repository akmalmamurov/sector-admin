import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { PromotionRequest } from "@/types";
import { toast } from "react-toastify";

const updatePromotion = async ({
    id,
    data,
}: {
    id: string;
    data: FormData;
    }): Promise<PromotionRequest> => {
        for (const [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
    const res = await request.patch<PromotionRequest>(`/promotion/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const useUpdatePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation<PromotionRequest, AxiosError, { id: string; data: FormData }>({
        mutationFn: updatePromotion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotion"] });
            toast.success("Updated successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
        });
};
