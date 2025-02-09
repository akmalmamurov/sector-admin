import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Brand } from "@/types";
import { toast } from "react-toastify";

const createBrand = async (data: FormData): Promise<Brand> => {
  const res = await request.post<Brand>("/brand/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation<Brand, AxiosError, FormData>({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
