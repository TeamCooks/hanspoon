import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

initializeApp(firebaseConfig);
const auth = getAuth();

export const signIn = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)    ;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};

export const signUp = async ({ email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)    ;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};
