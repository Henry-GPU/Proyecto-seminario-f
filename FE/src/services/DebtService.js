import apiClient from "./apiClient";


export const getAllDebts = async (data) =>{
  try {
    const response = await apiClient.get("debt/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getTotalAllDebts = async (data) =>{
  try {
    const response = await apiClient.get("debt/get/total");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getTotalDebts = async (data) =>{
  try {
    const response = await apiClient.get("/get/total-no");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};



export const updateProductStock = async (data)=>{
  try {
    const response = await apiClient.post("products/addstock", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}


export const createStore = async (data) =>{
  try {
    const response = await apiClient.post("stores/create", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}
// ==================== GET ====================
export const getLowStockProducts = async () =>{
  try {
    const response = await apiClient.get("/products/lowStock/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getInventoryFile = async () =>{
  try {
    const response = await apiClient.get("/excel/download/inventory", {responseType: "blob"});
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getStores = async () => {
  try {
    const response = await apiClient.get(`stores/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`products/${id}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const getProductSerialsById = async (productId) => {
  try {
    const response = await apiClient.get(`products/${productId}/serials/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getAllProducts = async () =>{
  try {
    const response = await apiClient.get("products/getAll");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getProducts = async () =>{
  try {
    const response = await apiClient.get("products/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const updProduct = async (id, data) => {
  try {
    const response = await apiClient.put(`products/${id}/update`, data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}


// ==================== PATCH ====================

export const deleteSerial = async (data) => {
  try {
    const response = await apiClient.patch(`products/serial/retire`, data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const actProduct = async (data) =>{
  try {
    const response = await apiClient.patch(`products/${data}/activate`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const desProduct = async (data) =>{
  try {
    const response = await apiClient.patch(`products/${data}/desactivate`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};



export const delProduct = async (data) => {
  try {
    const response = await apiClient.delete(`products/${data}/delete`);
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
