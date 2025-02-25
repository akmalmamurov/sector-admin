import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
import { CREATE_POPULAR_CATEGORY } from "../../constants";

const createPopularCategory = async (isPopular: boolean): Promise<any> => {
  const res = await request.get<any>(
    `${CREATE_POPULAR_CATEGORY}?isPopular=${isPopular}`
  );
  return res.data;
};

export const useCreatePopularCategory = (isPopular: boolean) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, void>({
    mutationFn: () => createPopularCategory(isPopular),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["popular_category"] });
      toast.success("Popular category fetched successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
