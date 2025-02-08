import request from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const createData = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  const response = await request.post<TResponse>(url, data);
  return response.data;
};

export const useCreateData = <TRequest, TResponse = unknown>({
  url,
  invalidateQueryKey,
  onSuccess,
  onError,
}: {
  url: string;
  invalidateQueryKey?: string | string[];
  onSuccess?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, AxiosError, TRequest>({
    mutationFn: (data: TRequest) => createData<TRequest, TResponse>(url, data),
    onSuccess: (response) => {
      console.log("Request successful:", response);
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({
          queryKey: Array.isArray(invalidateQueryKey)
            ? invalidateQueryKey
            : [invalidateQueryKey],
        });
      }
      onSuccess?.(response);
    },
    onError: (error) => {
      console.error("Request failed:", error.message);
      onError?.(error); 
    },
  });
};
