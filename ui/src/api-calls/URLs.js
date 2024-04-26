const { API_HOST, API_PORT, CURRENT_ENV } = process.env;

const API_URL = API_HOST
  ? `${API_HOST}:${API_PORT}`
  : "http://localhost:443/api";

export const baseURL =
  CURRENT_ENV !== "production" ? API_URL : "http://productionHOST";

export const HELLO_WORLD_API = `/api/hello-world`;
export const HELLO_WORLD_API2 = `/api`;
