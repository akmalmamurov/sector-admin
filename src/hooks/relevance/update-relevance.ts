import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { RelevanceRequest, RelevanceResponse } from "@/types";
import { toast } from "react-toastify";

const updateRelevance = async ({ id, data, }: { id: string; data: RelevanceRequest; }): Promise<RelevanceResponse> => {
  const res = await request.put<RelevanceResponse>( `/product-detail/relavance/update/${id}`, data );
  return res.data;
};

export const useUpdateRelevance = () => {
  const queryClient = useQueryClient();

  return useMutation<RelevanceResponse, AxiosError, { id: string; data: RelevanceRequest }>(
    {
      mutationFn: updateRelevance,
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["relevance"] });
        toast.success( "Updated successfully!");
        console.log("update", res);
        
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    }
  );
};
