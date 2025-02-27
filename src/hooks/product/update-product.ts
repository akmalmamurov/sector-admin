import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { ProductData } from "@/types";
import { toast } from "react-toastify";

const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<ProductData> => {
  const res = await request.put<ProductData>(`/product/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductData, AxiosError, { id: string; data: FormData }>({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
