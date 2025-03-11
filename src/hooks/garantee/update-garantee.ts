import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { GaranteeData } from "@/types";
import { toast } from "react-toastify";
interface UpdateGaranteeProps {
    id: string;
    data: GaranteeData;
}
const updateGarantee = async ({ id, data }: UpdateGaranteeProps): Promise<GaranteeData> => {
    const res = await request.patch<GaranteeData>(`/garantee/update/${id}`, data);  
    return res.data;
};  

export const useUpdateGarantee = () => {
    const queryClient = useQueryClient();

    return useMutation<GaranteeData, AxiosError, UpdateGaranteeProps>({
        mutationFn: updateGarantee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["garantee"] });
            toast.success("Updated successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
