const { API_HOST, API_PORT, CURRENT_ENV } = process.env;

export const baseURL =
  CURRENT_ENV === "dev" ? `${API_HOST}:${API_PORT}` : "productionHOST";

export const HELLO_WORLD_API = `${baseURL}/hello-world`;
