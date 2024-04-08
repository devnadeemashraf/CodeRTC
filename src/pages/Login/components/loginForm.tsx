import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";
import { loginUserAsyncAction } from "@/store/actions/app/userActions";

import { cn } from "@/lib/utils";

import {
  selectAppAuthenticating,
  selectAppAuthenticated,
  selectAppError,
  selectAppSigningInStatus,
} from "@/store/selectors/app.selector";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector(selectAppAuthenticated);
  const authenticating = useAppSelector(selectAppAuthenticating);
  const status = useAppSelector(selectAppSigningInStatus);
  const error = useAppSelector(selectAppError);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /**
   * TODO: Add Form Validation
   */
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(
      loginUserAsyncAction({
        username,
        password,
      })
    );
  }

  useEffect(() => {
    if (status == "success" && !authenticating && authenticated) {
      navigate("/");
    }
    if (status == "failed" && !authenticating) {
      toast("Uh Oh! " + error);
    }
  }, [status, authenticating, authenticated]);

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
          <Button type="submit" disabled={status == "loading"}>
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
