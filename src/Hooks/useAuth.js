import { useState } from "react";
import { logOut, signIn as APISignIn, signUp as APISignUp } from "../api/requestAuth";

export const useAuth = () => {
  const [ authUser, setAuthUser ] = useState(null);
  const signIn = async requestData => {
    const user = await APISignIn(requestData);
    setAuthUser(user);
  }
  const signUp = async requestData => {
    const user = await APISignUp(requestData);
    setAuthUser(user);
  }
  const signOut = () => {
    logOut();
    setAuthUser(null);
  }
  return { authUser, signIn, signUp, signOut }
}