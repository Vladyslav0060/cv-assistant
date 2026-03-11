import { authControllerLogout } from "@/api/generated";
import { ROUTES } from "@/common/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await authControllerLogout();
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      qc.invalidateQueries({ queryKey: ["me"] });
      router.push(ROUTES.LOGIN);
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
  };
};
