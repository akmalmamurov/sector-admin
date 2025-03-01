import request from "@/services";
import { UserLogin } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useStore from "@/context/store";
import { toast } from "react-toastify";
interface LoginResponse {
  token: string;
  role: string;
  username: string;
  status: string;
}

const signIn = async (data: UserLogin): Promise<LoginResponse> => {
  const res = await request.post<LoginResponse>(`/admin/login`, data);
  return res.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useStore();

  return useMutation<LoginResponse, AxiosError, UserLogin>({
    mutationFn: signIn,
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.token);

      setAuth(true, response.role, response.username);

      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successfully!");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Network Error");
    },
  });
};
