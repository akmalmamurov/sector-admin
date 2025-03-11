import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deletePromotion = async (id: string): Promise<void> => {
    await request.delete(`/promotion/${id}`);
};

export const useDeletePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deletePromotion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotion"] });
            toast.success("Deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
