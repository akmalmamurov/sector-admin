import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Brand } from "@/types";
import { toast } from "react-toastify";
const updateBrand = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<Brand> => {
  const res = await request.put<Brand>(`/brand/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation<Brand, AxiosError, { id: string; data: FormData }>({
    mutationFn: updateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
