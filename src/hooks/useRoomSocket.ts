/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useTypedRTK";

import { toast } from "sonner";

import { socket } from "@/socket";

import { selectAppUser } from "@/store/selectors/app.selector";
import {
  selectActiveRoom,
  selectDeletingRoomStatus,
  selectPerformCacheCleanup,
} from "@/store/selectors/room/active.selector";

import { ADD_MESSAGE } from "@/store/slices/room/active.slice";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { ROOMS_CACHE_KEYS } from "@/constants/localStorageKeys";
import { deleteRoomAsyncAction } from "@/store/actions/rooms/deleteRoomAsync.action";

const useRoomSocket = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { getItems, setItems } = useLocalStorage();

  const user = useAppSelector(selectAppUser);
  const activeRoom = useAppSelector(selectActiveRoom);

  const deletingRoomStatus = useAppSelector(selectDeletingRoomStatus);
  const performCacheCleanup = useAppSelector(selectPerformCacheCleanup);

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

  function handleOnClickDeleteRoom() {
    if (activeRoom) {
      dispatch(deleteRoomAsyncAction(activeRoom?.id));
    }
  }

  /**
   * Side Effects
   */
  useEffect(() => {
    if (deletingRoomStatus == "success" && performCacheCleanup) {
      socket.emit("ON_DELETE_ROOM", {
        user,
        room: activeRoom,
      });
    }
  }, [deletingRoomStatus]);

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

    socket.on("FORCE_KICK_CONNECTED_USERS", (data) => {
      const { owner, roomId, message } = data;

      // Perfrom Cache Cleaning
      if (user?.id !== owner) {
        const cachedJoinedRooms = getItems(ROOMS_CACHE_KEYS.JOINED_ROOMS);
        const updatedCache = cachedJoinedRooms.filter(
          (room: IRoom) => room.id != roomId
        );
        setItems(ROOMS_CACHE_KEYS.JOINED_ROOMS, updatedCache);

        toast(message);
      } else {
        const cachedCreatedRooms = getItems(ROOMS_CACHE_KEYS.CREATED_ROOMS);
        const updatedCache = cachedCreatedRooms.filter(
          (room: IRoom) => room.id != roomId
        );
        setItems(ROOMS_CACHE_KEYS.CREATED_ROOMS, updatedCache);
      }

      navigate("/");
      socket.disconnect();
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
    handleOnClickDeleteRoom,
  };
};
export default useRoomSocket;
