import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteGarantee = async (id: string): Promise<void> => {
    await request.delete(`/garantee/delete/${id}`);
};

export const useDeleteGarantee = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteGarantee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["garantee"] });
            toast.success("Deleted successfully!");
        },
        onError: (error) => {
            console.error("Delete failed:", error.message);
            toast.error(`Error: ${error.message}`);
        },
    });
};
