import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
import { ErrorResponse, NewsRequest } from "@/types";

const createNews = async (data: FormData): Promise<NewsRequest> => {
    const res = await request.post<NewsRequest>("/news/create", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();

    return useMutation<NewsRequest, AxiosError<ErrorResponse>, FormData>({
        mutationFn: createNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("Created successfully!");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
