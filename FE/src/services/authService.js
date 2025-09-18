import apiClient from "./apiClient";

const handleRequestError = (error) => {
  if (error.response) {
    console.error("Error en la respuesta:", error.response.data);
    throw new Error(error.response.data.error || JSON.stringify(error.response.data));
  } else {
    console.error("Error de red:", error.message);
    throw new Error("Error de red o del servidor");
  }
};

export const userLogin = async (data) =>{
  try {
    const response = await apiClient.post("auth/login", data, { withCredentials: true });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const userLogout = async (data) => {
  try {
    const response = await apiClient.patch("auth/logout", data, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

