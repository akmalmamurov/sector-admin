import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ProductData } from "@/types";
import { toast } from "react-toastify";

const createProduct = async (data: FormData): Promise<ProductData> => {
  const res = await request.post<ProductData>("/product/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductData, AxiosError, FormData>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
