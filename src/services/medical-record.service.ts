import { apiClient } from "./api-client";

export const getMyPrescriptions = async () => {
  return apiClient.get("/medical-records/prescriptions/my");
};

export const getPrescriptionById = async (id: string) => {
  return apiClient.get(`/medical-records/prescriptions/${id}`);
};

export const getMyLabReports = async () => {
  return apiClient.get("/medical-records/lab-reports/my");
};

export const getMyHealthRecords = async () => {
  return apiClient.get("/medical-records/health-records/my");
};

export const getHealthRecordById = async (id: string) => {
  return apiClient.get(`/medical-records/health-records/${id}`);
};
