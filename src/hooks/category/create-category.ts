import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_CATEGORY } from "@/constants";
import { Category } from "@/types";
import { toast } from "react-toastify";

const createCategory = async (data: FormData): Promise<Category> => {
  const res = await request.post<Category>(CREATE_CATEGORY, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, AxiosError, FormData>({
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
