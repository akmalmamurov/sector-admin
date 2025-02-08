import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { CREATE_SUBCATALOG } from "@/constants";
import { SubCatalog, SubCatalogRequest } from "@/types";

const createSubCatalog = async (
  data: SubCatalogRequest
): Promise<SubCatalog> => {
  const res = await request.post<SubCatalog>(CREATE_SUBCATALOG, data);
  return res.data;
};

export const useCreateSubCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<SubCatalog, AxiosError, SubCatalogRequest>({
    mutationFn: createSubCatalog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcatalog"] });
    },
  });
};
