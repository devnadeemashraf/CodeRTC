/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

import { TJoinRoomSchema, joinRoomSchema } from "@/schema/roomForm";

import {
  selectJoinedRoomsError,
  selectJoinedRoomsProtected,
  selectJoinedRoomsRedirect,
  selectJoinedRoomsStatus,
} from "@/store/selectors/room/joined.selector";
import {
  joinRoomAsyncAction,
  verifyPasscodeAndJoinRoomAsyncAction,
} from "@/store/actions/rooms/joinAsync.action";

import { selectActiveRoom } from "@/store/selectors/room/active.selector";
import { selectAppUser } from "@/store/selectors/app.selector";

const PlaygroundJoiningForm = () => {
  const form = useForm<TJoinRoomSchema>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectAppUser);
  const activeRoom = useAppSelector(selectActiveRoom);

  const status = useAppSelector(selectJoinedRoomsStatus);
  const error = useAppSelector(selectJoinedRoomsError);
  const protectedRoom = useAppSelector(selectJoinedRoomsProtected);
  const redirect = useAppSelector(selectJoinedRoomsRedirect);

  const [passcodeValue, setPasscodeValue] = useState("");

  async function onSubmit(values: TJoinRoomSchema) {
    if (protectedRoom) {
      if (passcodeValue.length == 6) {
        dispatch(
          verifyPasscodeAndJoinRoomAsyncAction({
            roomId: values.roomId,
            userId: user?.id as string,
            passcode: passcodeValue,
          })
        );
      } else {
        toast("Passcode needs to have 6 digits");
      }
    } else {
      const isHref = values.roomId.includes("http" || "https");
      if (!isHref) {
        dispatch(
          joinRoomAsyncAction({
            roomId: values.roomId,
            userId: user?.id as string,
          })
        );
      } else {
        const roomId = values.roomId.trim().split("/")[4];
        dispatch(
          joinRoomAsyncAction({
            roomId,
            userId: user?.id as string,
          })
        );
      }
    }
  }

  // useEffect(() => {
  //   if (status == "failed" && error) {
  //     toast(error as string);
  //   }
  // }, [status, error]);

  useEffect(() => {
    if (status == "success" && redirect == true && activeRoom) {
      navigate(`/playground/${activeRoom.id}`);
    }
  }, [status, redirect, activeRoom]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        {/* Topic */}
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playground ID or Link</FormLabel>
              <FormControl>
                <Input placeholder="Paste room id or link here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passcode Input */}
        {protectedRoom && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="protected" className="text-left">
              Passcode
            </Label>
            <InputOTP
              maxLength={6}
              value={passcodeValue}
              onChange={(e) => {
                setPasscodeValue(e);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}

        <DialogFooter>
          <Button type="submit" disabled={status == "loading"}>
            {protectedRoom ? (
              <span>Verify Passcode and Join Room</span>
            ) : (
              <span>Join Room</span>
            )}
            {status == "loading" && (
              <Loader
                size={14}
                className="animate-spin ml-2 mt-1 ease-in-out"
              />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PlaygroundJoiningForm;
