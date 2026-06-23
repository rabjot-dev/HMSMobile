import { apiClient } from "./api-client";

export const getAppointments = async () => {
  return apiClient.get("/appointments");
};
export const getAppointmentById = async (id: string) => {
  return apiClient.get(`/appointments/${id}`);
};
export const cancelAppointment = async (id: string) => {
  return apiClient.patch(`/appointments/my/${id}/cancel`, null);
};
export const getAvailableSlots = async (
  doctorId: string,
  appointmentDate: string,
) => {
  return apiClient.get("/appointments/available-slots", {
    params: {
      doctorId,
      appointmentDate,
    },
  });
};
export const bookAppointment = async (data: any) => {
  return apiClient.post("/appointments/patient/book", data);
};
export const updateMyAppointment = async (id: string, data: any) => {
  return apiClient.put(`/appointments/my/${id}`, data);
};
