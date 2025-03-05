import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteQuestion = async (id: string): Promise<void> => {
    await request.delete(`/product-detail/question/${id}`);
};

export const useDeleteQuestion = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteQuestion(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["question"] });
            toast.success("Deleted successfully!");
        },
        onError: (error) => {   
            console.error("Delete failed:", error.message);
            toast.error(`Error: ${error.message}`);
        },
    });
};
