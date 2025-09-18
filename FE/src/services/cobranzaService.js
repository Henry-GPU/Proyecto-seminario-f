import apiClient from "./apiClient";


export const getMontoPorCanal = async (data) =>{
  try {
    const response = await apiClient.get("collection/get/monto-por-canal");
    return response;
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
