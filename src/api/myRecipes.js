import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { getFirestore, doc, setDoc, deleteDoc, updateDoc, increment, getDoc, collection, getDocs, Timestamp } from 'firebase/firestore';

initializeApp(firebaseConfig);

const db = getFirestore();

export const saveRecipe = async (userId, { recipeId, imgUrl, title }) => {
  const myRecipesRef = doc(db, 'users', userId, 'my-recipes', recipeId);
  const savedRecipesRef = doc(db, 'savedRecipes', recipeId);
  const savedRecipesSnap = await getDoc(savedRecipesRef);

  await setDoc(myRecipesRef, {
    id: recipeId,
    image: imgUrl,
    title: title,
    createdAt: Timestamp.fromDate(new Date()),
  });

  if (savedRecipesSnap.exists()) {
    await updateDoc(savedRecipesRef, {
      saved: increment(1),
    });
  } else {
    await setDoc(savedRecipesRef, {
      id: recipeId,
      img: imgUrl,
      title: title,
      saved: 1,
    });
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
  myRecipesSnapShot.forEach(doc => {
    myRecipes.push(doc.data());
  })
  return myRecipes;
}