import api from "./api.service";

export const login =
  async (
    email: string,
    password: string
  ) => {

    return api.post(
      "/auth/login",
      {
        loginId: email,
        password,
      }
    );
  };

export const createPassword =
  (data: any) => {
    return api.post(
      "/auth/create-password",
      data
    );
  };