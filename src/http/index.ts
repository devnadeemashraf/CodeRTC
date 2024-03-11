/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV == "development"
    ? "http://localhost:3001"
    : "https://codertc-backend.onrender.com";

const http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const getAuthStatus = async () => {
  try {
    const resp = await http.get("/api/v1/auth/user/auth-status");
    const result = await resp.data;

    if (result.message == "Authorized") {
      return result;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const fetchRequest = await http.post("/api/v1/auth/user/login", data);
    const axiosResponse = await fetchRequest.data;

    console.log("http -> ", axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    return axiosResponse.data;
  }
};

export const getUserInfo = async (data: { userId: string }) => {
  try {
    const fetchRequest = await http.get(
      `/api/v1/auth/user/info/${data.userId}`
    );
    const axiosResponse = await fetchRequest.data;

    console.log("http -> ", axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    return axiosResponse.data;
  }
};

export const registerUser = async (data: {
  username: string;
  name: string;
  password: string;
}) => {
  try {
    const fetchRequest = await http.post("/api/v1/auth/user/register", data);
    const axiosResponse = await fetchRequest.data;

    console.log("http -> ", axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log("[ERR] http -> ", axiosResponse);

    return axiosResponse.data;
  }
};

export const logoutUser = async () => {
  try {
    const fetchRequest = await http.post("/api/v1/auth/user/logout");
    const axiosResponse = await fetchRequest.data;

    console.log("http -> ", axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log("[ERR] http -> ", axiosResponse);

    return axiosResponse.data;
  }
};
