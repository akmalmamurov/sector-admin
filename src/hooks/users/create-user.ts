import request from "@/services";
import { UsersProps, UserCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createUser = async (data: UserCreateRequest): Promise<UsersProps> => {
  const res = await request.post<UsersProps>("/admin/create", data);
  return res.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UsersProps, AxiosError, UserCreateRequest>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};
