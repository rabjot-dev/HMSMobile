const DEFAULT_API_BASE_URL = "https://bootstrap-hms.duckdns.org/api";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
export const FILE_BASE_URL = API_BASE_URL.replace("/api", "");
