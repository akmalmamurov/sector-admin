import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteComment = async (id: string): Promise<void> => {
    await request.delete(`/product-detail/comments/${id}`);
};

export const useDeleteComment = () => { 
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comment"] });
            toast.success("Deleted successfully!");
        },
        onError: (error) => {
            console.error("Delete failed:", error.message);
            toast.error(`Error: ${error.message}`);
        },
    });
};
