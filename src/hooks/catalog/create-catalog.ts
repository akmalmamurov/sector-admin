import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_CATALOG } from "@/constants";
import { Catalog, CatalogRequest } from "@/types";
import { toast } from "react-toastify";

const createCatalog = async (data: CatalogRequest): Promise<Catalog> => {
  const res = await request.post<Catalog>(CREATE_CATALOG, data);
  return res.data;
};

export const useCreateCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<Catalog, AxiosError, CatalogRequest>({
    mutationFn: createCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`, { theme: "colored" });
    },
  });
};
