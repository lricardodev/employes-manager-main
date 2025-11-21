import axios from "axios";
import { mockApi } from "../services/mockApi";

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === "true" ||
  (!import.meta.env.VITE_API_BASE_URL && import.meta.env.PROD);

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3005";
export const IS_MOCK_MODE = USE_MOCK;

// Debug log (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log("API Config:", {
    USE_MOCK,
    API_BASE_URL,
    PROD: import.meta.env.PROD,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_USE_MOCK: import.meta.env.VITE_USE_MOCK,
  });
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (USE_MOCK) {
  const originalRequest = api.request.bind(api);

  api.request = async function (config) {
    if (typeof config === "string") {
      config = { url: config };
    }

    let url = config.url || "";
    // Remover baseURL si está presente en la URL
    if (url.startsWith(API_BASE_URL)) {
      url = url.replace(API_BASE_URL, "");
    }
    // Asegurar que la URL comience con /
    const relativeUrl = url.startsWith("/") ? url : `/${url}`;
    const method = (config.method || "get").toLowerCase();

    try {
      let response;
      switch (method) {
        case "get":
          response = await mockApi.get(relativeUrl);
          break;
        case "post":
          response = await mockApi.post(relativeUrl, config.data);
          break;
        case "put":
          response = await mockApi.put(relativeUrl, config.data);
          break;
        case "delete":
          response = await mockApi.delete(relativeUrl);
          break;
        default:
          throw new Error(`Method ${method} not supported`);
      }

      return Promise.resolve({
        data: response.data,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
    } catch (error) {
      return Promise.reject({
        response: {
          data: { message: error.message },
          status: 404,
          statusText: "Not Found",
          headers: {},
          config: config,
        },
        message: error.message,
      });
    }
  };

  api.get = function (url, config) {
    return api.request({ ...config, method: "get", url });
  };

  api.post = function (url, data, config) {
    return api.request({ ...config, method: "post", url, data });
  };

  api.put = function (url, data, config) {
    return api.request({ ...config, method: "put", url, data });
  };

  api.delete = function (url, config) {
    const deleteConfig = { ...config, method: "delete", url };
    return api.request(deleteConfig);
  };
}
