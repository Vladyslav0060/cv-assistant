import { userControllerUpdateUser } from "@/api/generated";
import { UpdateUserDto } from "@/api/generated.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUpdateUser = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: UpdateUserDto) => {
      const response = await userControllerUpdateUser(data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      qc.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    isLoading: isPending, //todo
  };
};
