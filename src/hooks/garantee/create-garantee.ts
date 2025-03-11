import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { GaranteeData } from "@/types";
import { toast } from "react-toastify";

const createGarantee = async (data: GaranteeData): Promise<GaranteeData> => {
    const res = await request.post<GaranteeData>("/garantee/add", data);    
    return res.data;
};  

export const useCreateGarantee = () => {
    const queryClient = useQueryClient();

    return useMutation<GaranteeData, AxiosError, GaranteeData>({
        mutationFn: createGarantee,     
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["garantee"] });
            toast.success("Created successfully!");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });
};
