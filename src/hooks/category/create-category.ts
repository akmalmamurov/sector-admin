import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_CATEGORY } from "@/constants";
import {  Category, CategoryRequest } from "@/types";
import { toast } from "react-toastify";

const createCategory = async (data: CategoryRequest): Promise<Category> => {
  const res = await request.post<Category>(CREATE_CATEGORY, data);
  return res.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, AxiosError, CategoryRequest>({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
