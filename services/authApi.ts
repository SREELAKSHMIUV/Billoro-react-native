import { api } from "./api";

export const loginUser =
  async (
    identifier: string,
    password: string
  ) => {
    const response =
      await api.post(
        "/v1/auth/login",
        {
          identifier,
          password,
        }
      );

    return response.data;
  };
  export const forgotPassword =
  async (phone: string) => {

    const response =
      await api.post(
        "/v1/auth/forgot-password",
        {
          phone,
        }
      );

    return response.data;
};