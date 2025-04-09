import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { AddProductToFilter, AddProductToFilterResponse } from "@/types";
import { toast } from "react-toastify";

const addProductToFilter = async (data: {
  data: AddProductToFilterResponse;
  id: string;
}): Promise<AddProductToFilter> => {
  const res = await request.post<AddProductToFilter>("/catalog-filter/addProduct", data.data, {
    params: {id: data.id},
  });
  return res.data;
};

export const useAddProductToFilter = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AddProductToFilter,
    AxiosError,
    { data: AddProductToFilterResponse; id: string }
  >({
    mutationFn: (data) => addProductToFilter(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-to-filter"] });
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      console.log(error);

      toast.error(`Error: ${error.message}`, { theme: "colored" });
    },
  });
};
