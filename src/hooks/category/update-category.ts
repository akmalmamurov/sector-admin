import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Category, CategoryRequest } from "@/types";
import { UPDATE_CATEGORY } from "@/constants";

const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: CategoryRequest;
}): Promise<Category> => {
  const res = await request.put<Category>(`${UPDATE_CATEGORY}/${id}`, data);
  return res.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Category,
    AxiosError,
    { id: string; data: CategoryRequest }
  >({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
