import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
import {  FilterFormData, FilterResponse } from "@/types";


const createFilter = async (data: FilterFormData): Promise<FilterResponse> => {
  const res = await request.post<FilterResponse>(
    "/catalog-filter/create",
    data
  );
  return res.data;
};

export const useCreateFilter = () => {
  const queryClient = useQueryClient();

  return useMutation<FilterResponse, AxiosError, FilterFormData>({
    mutationFn: createFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
