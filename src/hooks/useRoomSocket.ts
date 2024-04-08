/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useTypedRTK";

import { socket } from "@/socket";

import { selectAppUser } from "@/store/selectors/app.selector";
import { selectActiveRoom } from "@/store/selectors/room/active.selector";

import { ADD_MESSAGE } from "@/store/slices/room/active.slice";
import { useNavigate } from "react-router-dom";

const useRoomSocket = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAppUser);
  const activeRoom = useAppSelector(selectActiveRoom);

  const [loading, setLoading] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  function connectSocket() {
    socket.connect();
    setConnected(true);
  }

  function disconnectSocket() {
    if (connected && activeRoom) {
      setLoading(true);

      const payload = {
        user,
        room: activeRoom,
      };

      socket.emit("LEAVE_ROOM", payload);

      setConnected(false);
      setLoading(false);

      socket.disconnect();
      navigate("/");
    }
  }

  /**
   * User Joined Socket Event
   */
  useEffect(() => {
    socket.on("USER_JOINED_ROOM", (data) => {
      dispatch(ADD_MESSAGE(data));
    });

    socket.on("USER_LEFT_ROOM", (data) => {
      dispatch(ADD_MESSAGE(data));
    });
  }, []);

  // Initiate Join Room when Active Room is loaded
  useEffect(() => {
    if (connected && activeRoom) {
      setHasJoined(true);

      const payload = {
        user,
        room: activeRoom,
      };

      if (!hasJoined) {
        // User Joins the room
        socket.emit("JOIN_ROOM", payload);
      }
    }
  }, [connected, activeRoom]);

  return {
    loading,
    connected,
    connectSocket,
    disconnectSocket,
  };
};
export default useRoomSocket;
