import apiClient from "./apiClient";


export const getTotalPagos = async () =>{
  try {
    const response = await apiClient.get("pago/get/total");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const crearPago = async (data) =>{
  try {
    const response = await apiClient.post("pago/registrar", data);
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
