import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { loginUser } from "@/http";

import { useAppDispatch } from "@/hooks/useTypedRTK";
import { resetAppState, setAuth, setUser } from "@/store/slices/appSlice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    loginUser({
      username,
      password,
    })
      .then((data) => {
        console.log("loginForm -> ", data);
        if (data.status == "ERR") {
          toast({
            title: "Login Error",
            description: data.message,
          });
        } else {
          dispatch(setAuth(true));
          dispatch(setUser(data.user));

          navigate("/");

          toast({
            title: "Login Success!",
            description: "Welcome back!",
          });
        }
      })
      .catch((err) => {
        dispatch(resetAppState());

        console.log("[ERR] loginForm -> ", err);
        toast({
          title: "Login Error",
          description: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
