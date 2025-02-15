import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Category } from "@/types";
import { UPDATE_CATEGORY } from "@/constants";
import { toast } from "react-toastify";

const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<Category> => {
  const res = await request.put<Category>(`${UPDATE_CATEGORY}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, AxiosError, { id: string; data: FormData }>({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
