import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ErrorResponse, IOneOrderResponse, OrderDataFull } from "@/types";

const getOrderbyId = async (id: string): Promise<OrderDataFull> => {
  const res = await request.get<IOneOrderResponse>(`/orders/get-by-id/${id}`);
  return res.data.data;
};

export const usegetOrderbyId = (id: string, options?: { enabled?: boolean }) => {
  return useQuery<OrderDataFull, AxiosError<ErrorResponse>>({
    queryKey: ["orders", id],
    queryFn: () => getOrderbyId(id),
    enabled: options?.enabled ?? true,
  });
};
