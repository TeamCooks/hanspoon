import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, Timestamp } from 'firebase/firestore';

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const getAuthStatus = async () => {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => resolve(user));
    } catch(e) {
      reject(e);
    }
  });
}

export const signIn = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};

export const signUp = async ({ username, email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await setDoc(doc(db, 'users', user.uid), {
      username,
      email,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return user;
  } catch (error) {
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};

export const logOut = () => {
  signOut(auth);
};
