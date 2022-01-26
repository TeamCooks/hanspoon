import { useAuth } from '../Hooks';
import constate from 'constate';

const [AuthProvider, useAuthLoading, useAuthUser, useSignIn, useSignUp, useSignOut] = constate(
  useAuth,
  (value) => value.isLoading,
  (value) => value.authUser,
  (value) => value.signIn,
  (value) => value.signUp,
  (value) => value.signOut,
);

export { AuthProvider, useAuthUser, useAuthLoading, useSignIn, useSignUp, useSignOut };
