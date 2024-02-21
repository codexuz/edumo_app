// Import Firebase ESM modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDwmgfA_Ys71oHlk0jmCqIC7aPQD8xwZIQ",
  authDomain: "intrepid-honor-321018.firebaseapp.com",
  projectId: "intrepid-honor-321018",
  storageBucket: "intrepid-honor-321018.appspot.com",
  messagingSenderId: "189103273753",
  appId: "1:189103273753:web:cc2d7a635479ed2884b788",
  measurementId: "G-XMB16WK2C2"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase authentication methods
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);



// Function to register a new user
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Function to log in an existing user
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to sign out the current user
export const signOutUser = () => {
  return signOut(auth);
};

// Function to update user profile
export const updateUserProfile = (displayName, photoURL) => {
  return updateProfile(auth.currentUser, { displayName, photoURL });
};

// Function to listen for changes in authentication state
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};


export async function uploadFile(file) {
  const storageRef = ref(storage, `profilePictures/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}