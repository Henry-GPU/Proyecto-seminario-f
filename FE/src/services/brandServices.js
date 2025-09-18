import apiClient from "./apiClient";

export const createBrand = async (data) =>{
  try {
    const response = await apiClient.post("brands/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const getBrandsByCategoryId = async (categoryId) => {
  try {
    const response = await apiClient.get(`brands/category/${categoryId}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};


export const delBrand = async (brandId) => {
  try {
    const response = await apiClient.delete(`brands/${brandId}/delete`);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};


// ==================== Error Handler ====================

const handleRequestError = (error) => {
  if (error.response) {
    console.error("Error en la respuesta:", error.response.data);
    throw new Error(error.response.data.error || JSON.stringify(error.response.data));
  } else {
    console.error("Error de red:", error.message);
    throw new Error("Error de red o del servidor");
  }
};
