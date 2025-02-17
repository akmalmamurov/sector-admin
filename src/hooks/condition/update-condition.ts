import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import {ConditionRequest, ConditionResponse } from "@/types";
import { toast } from "react-toastify";

const updateCondition = async ({ id, data, }: { id: string; data: ConditionRequest; }): Promise<ConditionResponse> => {
  const res = await request.put<ConditionResponse>( `/product-detail/condition/update/${id}`, data );
  return res.data;
};

export const useUpdateCondition = () => {
  const queryClient = useQueryClient();

  return useMutation<ConditionResponse, AxiosError, { id: string; data: ConditionRequest }>(
    {
      mutationFn: updateCondition,
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["condition"] });
        toast.success( "Updated successfully!");
        console.log("update", res);
        
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    }
  );
};
