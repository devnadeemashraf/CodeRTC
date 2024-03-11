import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";

import { registerUser } from "@/http";
import { useAppDispatch } from "@/hooks/useTypedRTK";

import { resetAppState, setAuth } from "@/store/slices/appSlice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    registerUser({
      username,
      name,
      password,
    })
      .then((data) => {
        if (data.status == "ERR") {
          toast({
            title: "Registration Error!",
            description: data.message,
          });
        } else {
          dispatch(setAuth(true));
          navigate("/");

          toast({
            title: "Registration Success!",
            description: "Welcome to CodeRTC!",
          });
        }
      })
      .catch((err) => {
        dispatch(resetAppState());

        console.log("[ERR] registerForm -> ", err);

        toast({
          title: "Registration Error!",
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
