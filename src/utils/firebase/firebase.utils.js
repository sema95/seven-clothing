import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider 
  } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCysyqQEbbmdbcF7_adeHkyOiDGolNAe7I",
  authDomain: "seven-clothing-db.firebaseapp.com",
  projectId: "seven-clothing-db",
  storageBucket: "seven-clothing-db.appspot.com",
  messagingSenderId: "914556314706",
  appId: "1:914556314706:web:8945f88380f3c11f43eb8b"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: "select_account"
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { 
        displayName, 
        email,
        createdAt
      });
    } catch(error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
};
