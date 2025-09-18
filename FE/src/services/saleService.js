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

export const createSale = async (data) => {
  try {
    const response = await apiClient.post("/sales/create", data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getSales = async ()=>{
  try {
    const response = await apiClient.get("/sales/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getSaleById = async (data) =>{
  try {
    const response = await apiClient.get(`sales/${data}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getCustomers = async () =>{
  try {
    const response = await apiClient.get(`/customers/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getLastSales = async () =>{
  try {
    const response = await apiClient.get('sales/last5/get');
    return response;

  } catch (error) {
    handleRequestError(error);
  }
};

export const getCustomerAddresses = async (data) =>{
  try {
    const response = await apiClient.get(`/customers/${data}/addresses/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const cancelSaleById = async (data) =>{
  try {
    const response = apiClient.patch(`sales/${data}/cancel`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}