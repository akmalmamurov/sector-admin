import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_POPULAR_CATEGORY } from "@/constants";
import { toast } from "react-toastify";
interface PopularCategoryResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    categoryIds: string[];
  };
}

const createPopularCategory = async (
  categoryIds: string[]
): Promise<PopularCategoryResponse> => {
  const data = { categoryIds };

  const res = await request.post<PopularCategoryResponse>(
    CREATE_POPULAR_CATEGORY,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const useCreatePopularCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<PopularCategoryResponse, AxiosError, string[]>({
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
