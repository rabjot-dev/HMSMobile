import api from "./api.service";

export const getDoctors =
  async () => {
    return api.get(
      "/employees/doctors"
    );
  };