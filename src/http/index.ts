/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV == "development"
    ? "http://localhost:3001/api/v1"
    : "https://codertc-backend.onrender.com/api/v1";

const http = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const checkAuthStatus = async () => {
  try {
    const resp = await http.get("/auth/status");
    const result = await resp.data;

    console.log(`[checkAuthStatus()] Result: `, result);

    if (result.status == "SUCCESS") {
      return result;
    }

    return null;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[checkAuthStatus()] Error: `, axiosResponse);
    return null;
  }
};

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const fetchRequest = await http.post("/auth/login", data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[loginUser()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[loginUser()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const registerUser = async (data: {
  name: string;
  username: string;
  password: string;
  profileImage: string;
}) => {
  try {
    const fetchRequest = await http.post("/auth/register", data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[registerUser()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[registerUser()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const getUserInfo = async (data: { userId: string }) => {
  try {
    const fetchRequest = await http.get(`/auth/user/info/${data.userId}`);
    const axiosResponse = await fetchRequest.data;

    console.log(`[getUserInfo()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[getUserInfo()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const logoutUser = async () => {
  try {
    const fetchRequest = await http.post("/auth/logout");
    const axiosResponse = await fetchRequest.data;

    console.log(`[logoutUser()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;
    console.log(`[logoutUser()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

// Room Endpoints
export const getAllRooms = () => {};

export const getAllAssociatedRooms = async () => {
  try {
    const fetchRequest = await http.get("/room/user/all");
    const axiosResponse = await fetchRequest.data;

    console.log(`[getAllAssociatedRooms()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[getAllAssociatedRooms()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const getAllRoomsAssociatedWithUser = async () => {
  try {
    const fetchRequest = await http.get("/room/user/all");
    const axiosResponse = await fetchRequest.data;

    console.log(`[getAllRoomsAssociatedWithUser()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[getAllRoomsAssociatedWithUser()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const createNewRoom = async (data: {
  topic: string;
  isProtected: boolean;
  passcode: string;
  language: string;
}) => {
  try {
    const fetchRequest = await http.post("/room/create", data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[createNewRoom()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[createNewRoom()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const verifyRoomId = async (data: { roomId: string }) => {
  try {
    const fetchRequest = await http.post(`/room/verify/${data.roomId}`, data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[verifyRoomId()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[verifyRoomId()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const attemptJoinRoom = async (data: {
  roomId: string;
  userId: string;
}) => {
  try {
    const fetchRequest = await http.post(`/room/join`, data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[attemptJoinRoom()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[attemptJoinRoom()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const attemptVerifyPasscodeAndJoinRoom = async (data: {
  roomId: string;
  userId: string;
  passcode: string;
}) => {
  try {
    const fetchRequest = await http.post(`/room/join?verifying=true`, data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[attemptVerifyPasscodeAndJoinRoom()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[attemptVerifyPasscodeAndJoinRoom()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const joinRoom = async (data: { roomId: string }) => {
  try {
    const fetchRequest = await http.post(`/room/join/${data.roomId}`);
    const axiosResponse = await fetchRequest.data;

    console.log(`[joinRoom()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[joinRoom()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const updateRoomCodeContent = async (data: {
  roomId: string;
  content: string;
}) => {
  try {
    const fetchRequest = await http.post(`/room/update/${data.roomId}`, {
      content: data.content,
    });
    const axiosResponse = await fetchRequest.data;

    console.log(`[updateRoomCodeContent()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[updateRoomCodeContent()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const verifyPasscode = async (data: {
  passcode: string;
  passcodeHash: string;
}) => {
  try {
    const fetchRequest = await http.post(`/room/verify-passcode`, data);
    const axiosResponse = await fetchRequest.data;

    console.log(`[verifyPasscode()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[verifyPasscode()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const getRoomDetails = async (roomId: string) => {
  try {
    const fetchRequest = await http.post(`/room/details`, {
      roomId,
    });
    const axiosResponse = await fetchRequest.data;

    console.log(`[getRoomDetails()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[getRoomDetails()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};

export const saveRoomCodeContent = async (
  roomId: string,
  codeContent: string
) => {
  try {
    const fetchRequest = await http.patch(`/room/save-code-changes`, {
      roomId,
      codeContent,
    });
    const axiosResponse = await fetchRequest.data;

    console.log(`[saveRoomCodeContent()] Result: `, axiosResponse);

    return await axiosResponse;
  } catch (error: any) {
    const axiosResponse = error.response;

    console.log(`[saveRoomCodeContent()] Error: `, axiosResponse);
    return axiosResponse.data;
  }
};
