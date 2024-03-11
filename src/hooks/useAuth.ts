import { useEffect, useState } from "react";

import { useAppDispatch } from "./useTypedRTK";

import { getAuthStatus, getUserInfo } from "@/http";
import { resetAppState, setAuth, setUser } from "@/store/slices/appSlice";

const useAuth = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAuthStatus()
      .then(async (data) => {
        if (data) {
          dispatch(setAuth(true));

          // Get User Info
          const userInfo = await getUserInfo({
            userId: data.user.id,
          });

          const user = await userInfo.user;

          dispatch(setUser(user));
        } else {
          dispatch(setAuth(false));
        }
      })
      .catch(() => {
        dispatch(resetAppState());
      })
      .finally(() => setLoading(false));
  }, []);

  return [loading];
};

export default useAuth;
