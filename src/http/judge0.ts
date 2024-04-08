/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV == "development"
    ? "http://localhost:2358"
    : "http://localhost:2358";

const http = axios.create({
  baseURL: baseURL,
  params: { base64_encoded: "true", fields: "*" },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
  },
});

export const submit = async (formData: {
  language_id: number;

  // encode source code to base64
  source_code: string;
  stdin: string;
}) => {
  try {
    const fetchRequest = await http.post("/submissions", formData);
    const axiosResponse = await fetchRequest.data;

    console.log(`[submit()] Result: `, axiosResponse);

    return axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[submit()] Error: `, axiosResponse);
    return axiosResponse;
  }
};

export const checkStatus = async (token: string) => {
  try {
    const fetchRequest = await http.get(`/submissions/${token}`);
    const axiosResponse = await fetchRequest.data;

    console.log(`[checkStatus()] Result: `, axiosResponse);

    return axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[checkStatus()] Error: `, axiosResponse);
    return axiosResponse;
  }
};
