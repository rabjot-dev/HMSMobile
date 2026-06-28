import api from "./api.service";

export const login = (email: string, password: string) => {
  return api.post("/auth/login", {
    loginId: email,
    password,
  });
};

export const createPassword = (data: any) => {
  return api.post("/auth/create-password", data);
};

export const getCurrentUser = () => {
  return api.get("/auth/me");
};

export const logout = async () => {
  return api.post("/auth/logout");
};
