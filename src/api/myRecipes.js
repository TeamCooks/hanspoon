import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  getDoc,
  collection,
  getDocs,
  Timestamp,
  orderBy,
  limit,
  query
} from 'firebase/firestore';

initializeApp(firebaseConfig);

const db = getFirestore();

export const saveRecipe = async (userId, recipeData) => {
  const myRecipesRef = doc(db, 'users', userId, 'my-recipes', recipeData.recipeId);
  const savedRecipesRef = doc(db, 'savedRecipes', recipeData.recipeId);
  const savedRecipesSnap = await getDoc(savedRecipesRef);

  await setDoc(myRecipesRef, {
    id: recipeData.recipeId,
    title: recipeData.title,
    img: recipeData.imgSrc,
    savedAt: Timestamp.fromDate(new Date()),
  });

  if (savedRecipesSnap.exists()) {
    await updateDoc(savedRecipesRef, {
      saved: increment(1),
    });
  } else {
    await setDoc(savedRecipesRef, { ...recipeData, saved: 1 });
  }
};

export const removeRecipe = async (userId, recipeId) => {
  const myRecipesRef = doc(db, 'users', userId, 'my-recipes', recipeId);
  const savedRecipesRef = doc(db, 'savedRecipes', recipeId);
  await deleteDoc(myRecipesRef);
  await updateDoc(savedRecipesRef, {
    saved: increment(-1),
  });
};

export const getMyRecipes = async (userId) => {
  const myRecipesRef = collection(db, 'users', userId, 'my-recipes');
  const myRecipesSnapShot = await getDocs(myRecipesRef);
  const myRecipes = [];
  myRecipesSnapShot.forEach((doc) => {
    myRecipes.push(doc.data());
  });
  return myRecipes;
};

export const getHotRecipes = async (num=6) => {
  const hotRecipesRef = collection(db, 'savedRecipes');
  const q = query(hotRecipesRef, orderBy('saved', 'desc'), limit(num));
  const hotRecipesSnapshot = await getDoc(q);
  const hotRecipes = [];
  hotRecipesSnapshot.forEach(doc =>{
    hotRecipes.push(doc.data());
  })
  return hotRecipes;
}