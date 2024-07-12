import { useMutation } from "@tanstack/react-query";
import { changePassword, login } from "./auth.api";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: changePassword,
  });
