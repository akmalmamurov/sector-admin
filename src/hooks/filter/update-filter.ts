import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import {  FilterResponse, UpdateFilterProps, } from "@/types";
import { toast } from "react-toastify";


const updateFilter = async ({ id, data }: { id: string; data: UpdateFilterProps }): Promise<FilterResponse> => {
    const res = await request.put<FilterResponse>(`/catalog-filter/update/${id}`, data);
    return res.data;
  };
  
export const useUpdateFilter = () => {
  const queryClient = useQueryClient();

  return useMutation<
    FilterResponse,
    AxiosError,
    { id: string; data: UpdateFilterProps }
  >({
    mutationFn: updateFilter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filter"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
