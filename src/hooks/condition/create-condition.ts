import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ConditionRequest, ConditionResponse } from "@/types";
import { toast } from "react-toastify";

const createCondition = async (data: ConditionRequest): Promise<ConditionResponse> => {
  const res = await request.post<ConditionResponse>("/product-detail/condition/create", data);
  return res.data;
};

export const useCreateCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<ConditionResponse, AxiosError, ConditionRequest>({
    mutationFn: createCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["condition"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
