import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, NewsRequest } from "@/types";
import { toast } from "react-toastify";

const updateNews = async ({ id, data, }: { id: string; data: FormData; }): Promise<NewsRequest> => {
    const res = await request.patch<NewsRequest>(`/news/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};


export const useUpdateNews = () => {
    const queryClient = useQueryClient();

    return useMutation<NewsRequest, AxiosError<ErrorResponse>, { id: string; data: FormData }>({
        mutationFn: updateNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("Updated successfully!");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
