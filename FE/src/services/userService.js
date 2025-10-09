import { da } from "date-fns/locale";
import apiClient from "./apiClient";
import { asyncThunkCreator } from "@reduxjs/toolkit";

const handleRequestError = (error) => {
  if (error.response) {
    console.error("Error en la respuesta:", error.response.data);
    throw new Error(error.response.data.error || JSON.stringify(error.response.data));
  } else {
    console.error("Error de red:", error.message);
    throw new Error("Error de red o del servidor");
  }
};

export const updUser = async (id, data) =>{
  try {
    const response = await apiClient.patch(`users/update`, data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getUsers = async (data) => {
  try {
    const response = await apiClient.get("users/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getUserById = async(data) =>{
  try {
    const response = await apiClient.get(`users/${data}/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};


export const getUserPermissions = async (data) =>{
  try {
    const response = await apiClient.get(`users/${data}/permissions/get`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const createUser = async (data) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const desUser = async (data) =>{
  try {
    const response = await apiClient.patch(`users/${data}/desactivate`,{});
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const actUser = async (data) =>{
  try {
    const response = await apiClient.patch(`users/${data}/activate`, {});
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const delUser = async (data) =>{
  try {
    const response = await apiClient.delete(`users/${data}/delete`);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getRoles = async () =>{
  try {
    const response = await apiClient.get("users/roles/get");
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}

export const verifyToken = async (data) =>{
  try {
    const response = await apiClient.post(`/auth/verifyAuthToken`, data);
    return response;
  } catch (error) {
    handleRequestError(error);
  }
}