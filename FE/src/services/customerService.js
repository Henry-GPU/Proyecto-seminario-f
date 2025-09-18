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

export const delCustomer = async (data) =>{
  try {
    const response = await apiClient.delete(`customers/${data}/delete`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const actCustomer = async (data) =>{
  try {
    const response = await apiClient.patch(`customers/${data}/activate`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const desCustomer = async (data) =>{
  try {
    const response = await apiClient.patch(`customers/${data}/desactivate`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getCustomers = async ()=>{
  try {
    const response = await apiClient.get("customers/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getTotalCustomers = async ()=>{
  try {
    const response = await apiClient.get("customers/get/total");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getTotalClientesConDeudas = async ()=>{
  try {
    const response = await apiClient.get("customers/get/total/con-deudas");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getCustomerById = async(data) =>{
  try {
    const response = await apiClient.get(`customers/${data}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  };
};

export const createCustomer = async (data) => {
  try {
    const response = await apiClient.post("customers/create", data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const createAddress = async (data) =>{
  try {
    const response = await apiClient.post("addresses/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updCustomer = async (id, data) =>{
  try {
    const response = await apiClient.patch(`customers/update`, data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
