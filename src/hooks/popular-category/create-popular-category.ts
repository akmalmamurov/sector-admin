import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_POPULAR_CATEGORY } from "@/constants";
import { Category } from "@/types";
import { toast } from "react-toastify";

const createPopularCategory = async (categoryIds: string[]): Promise<any> => {
  const data = {
    categoryIds,
  };

  const res = await request.patch<any>(CREATE_POPULAR_CATEGORY, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const useCreatePopularCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, string[]>({
    mutationFn: createPopularCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["popular_category"] });
      toast.success("Created Popular category successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
