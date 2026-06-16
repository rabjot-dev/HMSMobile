import api from "./api.service";

export const getAppointments =
  () =>
    api.get(
      "/appointments"
    );

export const getAppointmentById =
  (id: string) =>
    api.get(
      `/appointments/${id}`
    );

export const cancelAppointment =
  (id: string) =>
    api.delete(
      `/appointments/${id}`
    );

export const getAvailableSlots =
  (
    doctorId: string,
    appointmentDate: string
  ) =>
    api.get(
      "/appointments/available-slots",
      {
        params: {
          doctorId,
          appointmentDate,
        },
      }
    );

export const bookAppointment =
  (data: any) =>
    api.post(
      "/appointments/patient/book",
      data
    );

export const updateMyAppointment =
  (
    id: string,
    data: any
  ) =>
    api.put(
      `/appointments/my/${id}`,
      data
    );