import apiClient from "./apiClient";


export const getAllDebtAssignments = async (data) =>{
  try {
    const response = await apiClient.get("debtassignment/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const createDebtAssignment = async (data) =>{
  try {
    const response = await apiClient.post("debtassignment/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getCollections = async () =>{
  try {
    const response = await apiClient.get("collection/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}
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
