import apiClient from "./apiClient";

export const loadPermissions = async () => {
  try {
    const response = await apiClient.get("/permissions/get");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al obtener los datos:", error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error("Error de red:", error.message);
      throw new Error("Error de red o del servidor");
    }
  }
};

export const updatePermissions = async (data) => {
  try {
    const response = await apiClient.patch("/user/permissions", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al actualizar los permisos:", error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error("Error de red:", error.message);
      throw new Error("Error de red o del servidor");
    }
  }
};

export const loadUserPermissions = async (data) => {
  try {
    const response = await apiClient.get(`/users/${data}/permissions/get`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al obtener los datos:", error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error("Error de red:", error.message);
      throw new Error("Error de red o del servidor");
    }
  }
};
