/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

import { TCreateRoomSchema, createRoomSchema } from "@/schema/roomForm";

import {
  selectCreatedRoomsError,
  selectCreatedRoomsRedirect,
  selectCreatedRoomsStatus,
} from "@/store/selectors/room/created.selector";
import { selectActiveRoom } from "@/store/selectors/room/active.selector";
import { createRoomAsyncAction } from "@/store/actions/rooms/createAsync.action";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

const PlaygroundCreationForm = () => {
  const form = useForm<TCreateRoomSchema>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      topicValue: "",
      languageValue: "JavaScript",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const activeRoom = useAppSelector(selectActiveRoom);

  const status = useAppSelector(selectCreatedRoomsStatus);
  const redirect = useAppSelector(selectCreatedRoomsRedirect);
  const error = useAppSelector(selectCreatedRoomsError);

  const [privateRoom, setPrivateRoom] = useState(false);
  const [passcodeValue, setPasscodeValue] = useState("");

  const [languageValue] = useState("JavaScript");

  async function onSubmit(values: TCreateRoomSchema) {
    if (privateRoom && passcodeValue.length < 6) {
      toast("Passcode should have 6 digits");
    } else if (privateRoom && isNaN(Number(passcodeValue))) {
      toast("Passcode cannot be anything except numbers");
    } else {
      const newRoomObject = {
        topic: values.topicValue,
        isProtected: privateRoom,
        passcode: passcodeValue,
        language: values.languageValue,
      };

      dispatch(createRoomAsyncAction(newRoomObject));
    }
  }

  useEffect(() => {
    if (!privateRoom) {
      setPasscodeValue("");
    }
  }, [privateRoom]);

  useEffect(() => {
    if (status == "failed" && error) {
      toast(error as string);
    }
  }, [status, error]);

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
          name="topicValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="ex: Solving Two Pointers" {...field} />
              </FormControl>
              <FormDescription>
                What is it that you're gonna play with today?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Switch */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="protected" className="text-left">
            Private
          </Label>
          <Switch
            id="protected"
            checked={privateRoom}
            onCheckedChange={(e) => {
              setPrivateRoom(e);
            }}
          />
        </div>

        {/* Passcode Input */}
        {privateRoom && (
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

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="language" className="text-left">
            Language
          </Label>
          <h1
            id="language"
            className="w-full col-span-3 bg-accent h-10 rounded-md flex items-center px-2 cursor-not-allowed"
          >
            <span className="text-muted-foreground text-base">
              {languageValue}
            </span>
          </h1>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={status == "loading"}>
            Create Room{" "}
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

export default PlaygroundCreationForm;
