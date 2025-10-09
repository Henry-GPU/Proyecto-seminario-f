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

export const confirmDeliveryBySaleId = async (data) => {
  try {
    const response = await apiClient.patch("/shipments/confirm", data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getShipmentBySaleId = async (data) =>{
  try {
    const response = await apiClient.get(`shipments/sale/${data}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}