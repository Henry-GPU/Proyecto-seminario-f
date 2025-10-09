import apiClient from "./apiClient";


export const getAllDebtAssignments = async (data) =>{
  try {
    const response = await apiClient.get("debtassignment/get");
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
