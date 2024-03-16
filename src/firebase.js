// Import Firebase ESM modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCK5iuJwf3sXSY1dUvTxgIK-5jkQh6IpEE",
  authDomain: "exam-database-2eb01.firebaseapp.com",
  projectId: "exam-database-2eb01",
  storageBucket: "exam-database-2eb01.appspot.com",
  messagingSenderId: "813791000692",
  appId: "1:813791000692:web:bd52fd7604f6d8a62ff921"
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