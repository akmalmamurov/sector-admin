import classNames from "classnames";
import { X, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "../ui/button";
import { User, UserCreateRequest, UserRequest } from "@/types";
import { useCreateUser, useCurrentColor, useUpdateUser } from "@/hooks";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface UserModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  element: Partial<User>
}


export const UserModal = ({ isOpen, handleOpen, element }: UserModalProps) => {
  const theme = useCurrentColor();
  
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, reset, register, watch, formState: { errors,isDirty }, } = useForm({
    defaultValues: {
      username: "",
      password: "",
      role: "",
      status: "",
    },
  });
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const watchedValues = watch();


  const isCreateDisabled =
    !watchedValues.username?.trim() || !watchedValues.password?.trim();

  const onSubmit = (data: UserRequest | UserCreateRequest) => {
    if (element?.id) {
      if ("role" in data && "status" in data) {
        updateUser({
          id: element.id,
          username: data.username,
          role: data.role,
          status: data.status,
        },{
          onSuccess: () => {
            handleOpen();
          }
        });
      }
    } else {
      if ("password" in data) {
        createUser({
          username: data.username,
          password: data.password,
        },{
          onSuccess: () => {
            handleOpen();
          }
        });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset(
        element
          ? {
              username: element.username,
              password: element.password,
              role: element.role,
              status: element.status,
            }
          : { username: "", password: "", role: "", status: "" }
      );
    }
  }, [isOpen, element, reset]);
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className={theme.bg}>
        <DialogHeader className="font-bold">
          <DialogTitle className={theme.text}>
            {Object.keys(element).length !== 0 ? "Update User" : "Create User"}
          </DialogTitle>
          <button onClick={handleOpen}>
            <X
              className={classNames(
                theme.text,
                "w-6 h-6 absolute top-4 right-4"
              )}
            />
          </button>
        </DialogHeader>
              <DialogDescription className="hidden"></DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-textColor font-medium w-fit text-sm"
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className="inputs"
              id="username"
              placeholder="Enter Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Password with eye icon */}
          {Object.keys(element).length === 0 && (
            <div className="flex flex-col gap-1 relative">
              <label
                htmlFor="password"
                className="text-textColor font-medium w-fit text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="inputs"
                  id="password"
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-header" />
                  ) : (
                    <Eye className="text-header" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {Object.keys(element).length !== 0 && (
            <>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="role"
                  className="text-textColor font-medium w-fit text-sm"
                >
                  Role
                </label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="role"
                        className="border border-header rounded-md px-3 h-11 text-header ring-header focus:ring-header text-sm font-semibold"
                      >
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={"admin"}
                          className="text-header cursor-pointer"
                        >
                          Admin
                        </SelectItem>
                        <SelectItem
                          value={"super"}
                          className="text-header cursor-pointer"
                        >
                          Super
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Status Select */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="status"
                  className="text-textColor font-medium w-fit text-sm"
                >
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="status"
                        className="border border-header rounded-md px-3 h-11 text-header ring-header focus:ring-header text-sm font-semibold"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value={"active"}
                          className="text-header cursor-pointer"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value={"inactive"}
                          className="text-header cursor-pointer"
                        >
                          Inactive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </>
          )}

          {Object.keys(element).length !== 0 ? (
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={!isDirty}
            >
              Update User
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-2"
              disabled={isCreateDisabled}
            >
              Create User
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
