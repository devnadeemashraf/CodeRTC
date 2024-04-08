import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./useTypedRTK";
import { checkAuthUserAsyncAction } from "@/store/actions/app/userActions";
import { selectAppAuthenticatingStatus } from "@/store/selectors/app.selector";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const authenticatingStatus = useAppSelector(selectAppAuthenticatingStatus);

  /**
   * Validate User Session onLoad
   */
  useEffect(() => {
    dispatch(checkAuthUserAsyncAction());
  }, []);

  return authenticatingStatus == "loading";
};

export default useAuth;
