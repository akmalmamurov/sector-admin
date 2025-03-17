import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteProduct = async (id: string): Promise<void> => {
    await request.delete(`/product/delete/${id}`);
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
            toast.success("Deleted successfully!");
        },
        onError: (error) => {
            console.error("Delete failed:", error.message);
            toast.error(`Error: ${error.message}`);
        },
    });
};
