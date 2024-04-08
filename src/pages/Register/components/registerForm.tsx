import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

import { registerUserAsyncAction } from "@/store/actions/app/userActions";
import {
  selectAppError,
  selectAppRegisteringStatus,
} from "@/store/selectors/app.selector";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectAppRegisteringStatus);
  const error = useAppSelector(selectAppError);

  const [name, setName] = useState<string>("");
  const [profileImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(
      registerUserAsyncAction({
        name,
        username,
        password,
        profileImage,
      })
    );
  }

  useEffect(() => {
    if (status == "success") {
      navigate("/");
    }
  }, [status]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={status == "loading"}
            />

            <Label className="sr-only" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={status == "loading"}
            />

            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              disabled={status == "loading"}
            />
          </div>
          <Button disabled={status == "loading"}>
            {status == "loading" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
