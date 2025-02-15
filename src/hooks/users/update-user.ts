import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { UserRequest, UsersProps } from "@/types";
import { toast } from "react-toastify";

const updateUser = async ({ id, ...data }: { id: string } & UserRequest): Promise<UsersProps> => {
    const res = await request.put<UsersProps>(`/admin/update/${id}`, data);  
    return res.data;
  };
  
  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation<UsersProps, AxiosError, { id: string } & UserRequest>({
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast.success("Updated successfully!");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };
  