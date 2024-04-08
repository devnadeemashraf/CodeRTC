import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader, Lock } from "lucide-react";
import { verifyPasscode } from "@/http";
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

import { toast } from "sonner";
import { selectActiveRoom } from "@/store/selectors/room/active.selector";
import { SET_VERIFIED } from "@/store/slices/room/active.slice";

const PasscodeOverlay = ({
  setPasscodeVerified,
}: {
  setPasscodeVerified: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const activeRoom = useAppSelector(selectActiveRoom);

  const [verifying, setVerifying] = useState(false);
  const [value, setValue] = useState("");

  const handleOnClickPasscodeVerify = async () => {
    setVerifying(true);

    // If Valid
    const verificationResponse = await verifyPasscode({
      passcode: value,
      passcodeHash: activeRoom?.passcode as string,
    });

    if (verificationResponse.status == "SUCCESS") {
      dispatch(SET_VERIFIED(true));
      setVerifying(false);
      setPasscodeVerified(true);
    } else {
      setVerifying(false);
      toast("Invalid Passcode");
    }
  };

  return (
    <main className="w-full h-full z-[99999] bg-secondary/10 flex items-center justify-center">
      <Card className="max-w-[350px] w-full">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <Lock /> Protected
          </CardTitle>
          <CardDescription>
            The owner of this room has restricted access. Enter Passcode to
            continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full h-full flex flex-col items-center justify-center gap-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(e) => {
              setValue(e);
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
        </CardContent>
        <CardFooter>
          <Button
            disabled={verifying}
            onClick={handleOnClickPasscodeVerify}
            className="ml-auto"
            variant="secondary"
          >
            {verifying && (
              <Loader size={14} className="mr-2 animate-spin ease-in-out" />
            )}
            Verify
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default PasscodeOverlay;
