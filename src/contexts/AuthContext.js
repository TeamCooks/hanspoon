import { useAuth } from '../Hooks';
import constate from 'constate';

const [AuthProvider, useAuthUser, useSignIn, useSignUp, useSignOut] = constate(
  useAuth,
  (value) => value.authUser,
  (value) => value.signIn,
  (value) => value.signUp,
  (value) => value.signOut,
);

export { AuthProvider, useAuthUser, useSignIn, useSignUp, useSignOut };
