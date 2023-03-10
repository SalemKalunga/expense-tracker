// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXgbVaThjtnOKGEPTWOXe92mvp7vLwiPE",
  authDomain: "expense-tracker-v1-b208e.firebaseapp.com",
  projectId: "expense-tracker-v1-b208e",
  storageBucket: "expense-tracker-v1-b208e.appspot.com",
  messagingSenderId: "73906411021",
  appId: "1:73906411021:web:175d5fc72e08b0fee8e744",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

const db = getFirestore();
export const createUserDocumentFromAuth = async (user) => {
  const userReference = doc(db, "users", user.uid);
  const userSnap = await getDoc(userReference);
  //   if the user does not exist do this
  if (!userSnap.exists()) {
    const { email, displayName, uid, photoURL } = user;
    const createdAt = new Date();

    try {
      await setDoc(userReference, {
        displayName,
        email,
        createdAt,
        id: uid,
        photoURL,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userReference;
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
export const signUserOut = () => signOut(auth);
export const EXPENSES_COLLECTION_REF = collection(db, "expenses");

export const addNewExpense = async (newExpense) => {
  await addDoc(EXPENSES_COLLECTION_REF, newExpense);
};