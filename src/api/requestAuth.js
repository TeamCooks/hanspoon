import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc, Timestamp } from 'firebase/firestore';

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const signIn = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log(test);
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
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};
