import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import {  RelevanceRequest, RelevanceResponse } from "@/types";
import { toast } from "react-toastify";

const createReleavance = async (data: RelevanceRequest): Promise<RelevanceResponse> => {
  const res = await request.post<RelevanceResponse>("/product-detail/relavance/create", data);
  return res.data;
};

export const useCreateReleavance = () => {
  const queryClient = useQueryClient();

  return useMutation<RelevanceResponse, AxiosError, RelevanceRequest>({
    mutationFn: createReleavance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relevance"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
