import api from "./api.service";
let doctorsCache:
  any[] | null =
  null;
export const getDoctors =
  async () => {
    if (
      doctorsCache
    ) {
      return {
        data: {
          data:
            doctorsCache,
        },
      };
    }

    const response =
      await api.get(
        "/employees/doctors",
      );

    doctorsCache =
      response.data.data;

    return response;
  };
  export const clearDoctorsCache =
  () => {
    doctorsCache =
      null;
  };