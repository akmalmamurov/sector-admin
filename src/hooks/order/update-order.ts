import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { UpdateOrderData, OrderDataFull, ErrorResponse } from "@/types";
import { toast } from "react-toastify";

const updateOrders = async ({ id, data }: { id: string; data: UpdateOrderData }): Promise<OrderDataFull> => {
    const res = await request.patch<OrderDataFull>(`/orders/update/${id}`, data);
    return res.data;
};

// React Query Hook
export const useUpdateOrders = () => {
    const queryClient = useQueryClient();

    return useMutation<OrderDataFull, AxiosError<ErrorResponse>, { id: string; data: UpdateOrderData }>({
        mutationFn: updateOrders,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("✅ Order successfully updated!");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
