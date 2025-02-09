import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { Catalog, CatalogRequest } from "@/types";
import { UPDATE_CATALOG } from "@/constants";
import { toast } from "react-toastify";

const updateCatalog = async ({
  id,
  data,
}: {
  id: string;
  data: CatalogRequest;
}): Promise<Catalog> => {
  const res = await request.put<Catalog>(`${UPDATE_CATALOG}/${id}`, data);
  return res.data;
};

export const useUpdateCatalog = () => {
  const queryClient = useQueryClient();

  return useMutation<Catalog, AxiosError, { id: string; data: CatalogRequest }>(
    {
      mutationFn: updateCatalog,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["catalog"] });
        toast.success("Updated successfully!");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    }
  );
};

