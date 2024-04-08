import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "./useTypedRTK";

import { encode } from "js-base64";
import { checkStatus, submit } from "@/http/judge0";

import {
  selectActiveRoom,
  selectActiveRoomSavingCodeContentStatus,
  selectActiveRoomVerified,
  selectFetchingRoomInfoStatus,
} from "@/store/selectors/room/active.selector";
import { saveRoomCodeContentAsyncAction } from "@/store/actions/rooms/saveCodeContentAsync.action";
import { getRoomInfoAsyncAction } from "@/store/actions/rooms/getRoomInfoAsync.action";
import { RESET_ACTIVE_ROOM } from "@/store/slices/room/active.slice";

const useRoomFunctionalities = () => {
  const dispatch = useAppDispatch();

  const activeRoom = useAppSelector(selectActiveRoom);
  const activeRoomPasscodeVerified = useAppSelector(selectActiveRoomVerified);

  const statusGetRoomDetails = useAppSelector(selectFetchingRoomInfoStatus);
  const statusSaveRoomCodeContent = useAppSelector(
    selectActiveRoomSavingCodeContentStatus
  );

  /**
   * Local Hook States
   */
  const [roomIdFromHref, setRoomIdFromHref] = useState("");

  const [codeContent, setCodeContent] = useState<string>("");
  const [codeOutput, setCodeOutput] = useState<string>("");

  const [savingCode, setSavingCode] = useState<boolean>(false);
  const [compilingCode, setCompilingCode] = useState<boolean>(false);

  /**
   * FUCNTIONS
   */

  /**
   * Save Room Code Content
   */
  const handleOnClickSave = () => {
    dispatch(
      saveRoomCodeContentAsyncAction({
        roomId: roomIdFromHref,
        codeContent,
      })
    );
  };

  /**
   * Copy URL to Clipboard
   */
  const handleOnClickShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // toast("Copied Room URL to Clipboard");
  };

  /**
   * Compile Code
   */
  const handleOnClickRun = async () => {
    setCompilingCode(true);
    /** Currently Only Supports JavaScript */
    const formData = {
      language_id: 63, // JavaScript
      source_code: encode(activeRoom?.codeContent as string),
      stdin: encode(activeRoom?.codeContent as string),
    };
    try {
      const response = await submit(formData);
      const token = await response.token;
      if (token) {
        await checkCompilationStatus(token);
      } else {
        setCompilingCode(false);
      }
    } catch (error) {
      //   toast("Code Execution Failed. Something Went Wrong.");
      setCompilingCode(false);
    }
  };

  /**
   * Check Code Compilation Status
   */
  const checkCompilationStatus = async (token: string) => {
    try {
      const response = await checkStatus(token);
      const statusId = await response.status?.id;

      console.log("[Playground/checkCompilationStatus()] Result: ", response);

      if (statusId === 1 || statusId === 2) {
        /**
         * Processing Not Complete Yet, Check Again
         */
        setTimeout(() => {
          checkCompilationStatus(token);
        }, 3 * 1000); // every 3 seconds
      } else {
        setCompilingCode(false);
        setCodeOutput(response); // Set Output Details for Console.
      }
    } catch (err) {
      console.log("[Playground/checkCompilationStatus()] Error: ", err);
      setCompilingCode(false);
    }
  };

  /**
   * SIDE EFFECTS
   */

  /**
   * Set Room ID from URL
   */
  useEffect(() => {
    setRoomIdFromHref(window.location.href.split("/")[4]);
  }, []);

  /**
   * Get Room Data from Server Async
   */
  useEffect(() => {
    if (roomIdFromHref != "") {
      dispatch(
        getRoomInfoAsyncAction({
          roomId: roomIdFromHref,
        })
      );
    }
  }, [roomIdFromHref]);

  /**
   * Update Local Code Content State when Active Room State Changes
   */
  useEffect(() => {
    if (activeRoom) {
      setCodeContent(activeRoom.codeContent);
    }
  }, [activeRoom]);

  /**
   * Save Code Async
   */
  useEffect(() => {
    if (statusSaveRoomCodeContent == "loading") {
      setSavingCode(true);
    } else {
      setSavingCode(false);
    }
  }, [statusSaveRoomCodeContent]);

  /**
   * Clear Active Room Data when leaving room
   * NOTE: Perform other actions as well in here
   */
  useEffect(() => {
    return () => {
      dispatch(RESET_ACTIVE_ROOM());
    };
  }, []);

  return {
    roomId: roomIdFromHref,
    activeRoom,
    activeRoomPasscodeVerified,
    codeContent,
    setCodeContent,
    codeOutput,
    setCodeOutput,
    savingCode,
    compilingCode,
    statusGetRoomDetails,
    statusSaveRoomCodeContent,
    handleOnClickShare,
    handleOnClickSave,
    handleOnClickRun,
  };
};
export default useRoomFunctionalities;
