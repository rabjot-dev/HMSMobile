import { getToken } from "../storage/token.storage";
import api from "./api.service";

export const getDashboard = async () => {
  const token = await getToken();

  console.log("TOKEN", token);

  return api.get("/patients/dashboard");
};
export const registerPatient = (data: any) =>
  api.post("/patients/register", data);
export const getProfile = () => api.get("/patients/profile");

export const updateProfile = (data: any) => api.put("/patients/profile", data);
