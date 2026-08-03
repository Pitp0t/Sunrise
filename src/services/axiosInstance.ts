import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://api.sunrisesunset.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Ha ocurrido un error inesperado.";

    if (error.response) {
      message = error.response.data?.message ?? `Error ${error.response.status}: No se pudo completar la solicitud.`;
    } else if (error.request) {
      message = "No se pudo conectar con el servidor. Revisa tu conexión.";
    } else {
      message = error.message;
    }

    toast.error(message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
