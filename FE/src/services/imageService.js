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

export const saveImageUrls = async (data)=>{
  try {
    const response = await apiClient.post("images/urls", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const saveImages = async (data) =>{
  try {
    const response = await apiClient.post("images/save", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
    }});
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}


