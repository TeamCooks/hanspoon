import { useEffect, useState } from 'react';
import { getAuthStatus, logOut, signIn as APISignIn, signUp as APISignUp } from '../api/requestAuth';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    (async () => {
      setIsLoading(true);
      const user = await getAuthStatus();
      setAuthUser(user);
      setIsLoading(false);
    })();
  }, [])

  const signIn = async (requestData) => {
    const userData = await APISignIn(requestData);
    setAuthUser(userData);
  };
  const signUp = async (requestData) => {
    const userData = await APISignUp(requestData);
  };
  const signOut = () => {
    logOut();
    setAuthUser(null);
  };
  return { authUser, isLoading, signIn, signUp, signOut };
};
