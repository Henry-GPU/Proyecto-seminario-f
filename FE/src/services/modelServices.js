import apiClient from "./apiClient";

export const createModel = async (data) =>{
  try {
    const response = await apiClient.post("models/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getModelsByBrandId = async (brandId) => {
  try {
    const response = await apiClient.get(`models/brand/${brandId}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const delModel = async (modelId) => {
  try {
    const response = await apiClient.delete(`models/${modelId}`);
    return response;
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
