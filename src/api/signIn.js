import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async ({ email, password }) => {
  try {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password)    ;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
};
