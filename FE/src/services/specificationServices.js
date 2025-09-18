import apiClient from "./apiClient";

export const createSpec = async (data) =>{
  try {
    const response = await apiClient.post("specs/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}


export const delSpec = async (specId) => {
  try {
    const response = await apiClient.delete(`spec/${specId}/delete`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getSpecs = async (typeId) => {
  try {
    const response = await apiClient.get(`specs/type/${typeId}/get`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error) => {
  if (error.response) {
    console.error("Error en la respuesta:", error.response.data);
    throw new Error(error.response.data.error || JSON.stringify(error.response.data));
  } else {
    console.error("Error de red:", error.message);
    throw new Error("Error de red o del servidor");
  }
};
