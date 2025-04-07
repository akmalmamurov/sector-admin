import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ChangeOrderData } from "@/types";
import { toast } from "react-toastify";

interface ChangeOrderResponse {
    message: string;
}

interface ErrorResponse {
    message: string;
}

const changeOrder = async (data: ChangeOrderData): Promise<ChangeOrderResponse> => {
    console.log(data);
    const res = await request.patch<ChangeOrderResponse>(
        "/change-order/update",
        { id: data.id, index: data.index },
        { params: { name: data.name } }
    );
    return res.data;
};

export const useChangeOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<ChangeOrderResponse, AxiosError<ErrorResponse>, ChangeOrderData>({
        mutationFn: (data) => changeOrder(data),
        onSuccess: (res, variables) => {
            if (variables.name) {
                queryClient.invalidateQueries({ queryKey: [variables.name] });
            }
            toast.success(`${res?.message}`);
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const backendMessage = error.response?.data?.message;
            toast.error(backendMessage || `Error: ${error.message}`);
        }
    });
};
