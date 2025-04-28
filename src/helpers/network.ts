import axios from "axios";
import { HOST_URL } from "@/constants/config";

const skipEmptyParam = (obj: Record<string, unknown>) => {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const callApi = axios.create({
  headers: { Accept: "application/json" },
  baseURL: HOST_URL ? `${HOST_URL}/api` : "/api",
});

callApi.interceptors.request.use(
  async (config) => {
    if (config.params) {
      config.params = skipEmptyParam(config.params);
    }

    if (config.headers?.Authorization) {
      return config;
    }

    return config;
  },
  async (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

callApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default callApi;
