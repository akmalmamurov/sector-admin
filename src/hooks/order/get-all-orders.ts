import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, OrderDataFull, OrderResponse } from "@/types";

const getOrders = async (): Promise<OrderDataFull[]> => {
    const res = await request.get<OrderResponse>("/orders/all");
    return res.data.data;
};

export const usegetOrders = () => {
    return useQuery<OrderDataFull[], AxiosError<ErrorResponse>>({
        queryKey: ["orders"],
        queryFn: getOrders,
    });
};
