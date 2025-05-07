import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types";

const deleteNews = async (id: string): Promise<void> => {
    await request.delete(`/news/delete/${id}`);
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ErrorResponse>, { id: string }>({
        mutationFn: ({ id }) => deleteNews(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("Deleted successfully!");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
