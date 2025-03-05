import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
interface IUpdateBrandWithPath {
    data:{
        name: string;
        type: string;
    }
}
const updateBrandWithPath = async ({
    id,
    path,
}: {
    id: string;
    path: string;
}): Promise<IUpdateBrandWithPath> => {
    const res = await request.put<IUpdateBrandWithPath>(`/brand/update-path/${id}`, { path });
    return res.data;
};

export const useUpdateBrandWithPath = () => {
    const queryClient = useQueryClient();

        return useMutation<IUpdateBrandWithPath, AxiosError, { id: string; path: string }>({
        mutationFn: updateBrandWithPath,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["brand"] });
            toast.success("Updated successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
