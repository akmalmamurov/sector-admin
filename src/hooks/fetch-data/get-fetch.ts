import request from "@/services";
import { LinkProduct, ProductLinkProp } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createProductLink = async (
  data: ProductLinkProp
): Promise<{ data: LinkProduct }> => {
  const res = await request.post<{ data: LinkProduct }>(
    "/fetch-data/extract",
    data
  );
  return res.data; 
};

export const useProductLink = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: LinkProduct }, AxiosError, ProductLinkProp>({
    mutationFn: createProductLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["url"] });
      // toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
