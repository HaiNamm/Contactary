import { axios } from "@/lib/axios";
import { LoginData } from "./auth.type";
export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => axios.post<{ data: LoginData }>("/login", { email, password });

export const changePassword = ({
  email,
  password,
  oldPassword,
}: {
  email: string;
  password: string;
  oldPassword: string;
}) =>
  axios.post<{ data: string }>("/change-password", {
    email,
    password,
    old_password: oldPassword,
  });
