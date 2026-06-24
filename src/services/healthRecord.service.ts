import api from "./api.service";

export const getMyHealthRecord =
  () => {
    return api.get(
      "/health-records/me",
    );
  };