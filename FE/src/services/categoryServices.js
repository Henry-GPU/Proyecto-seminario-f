import apiClient from "./apiClient";

export const getCategories = async () => {
  try {
    const response = await apiClient.get("categories/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getCategoryById = async (data) => {
  try {
    const response = await apiClient.get(`categories/${data}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const createCategory = async (data) =>{
  try {
    const response = await apiClient.post("categories/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const delCategory = async (typeId) => {
  try {
    const response = await apiClient.delete(`categories/${typeId}/delete`);
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
