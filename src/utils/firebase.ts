import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  signOut,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { Config } from "@/constants";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: Config.firebase.apiKey,
  authDomain: Config.firebase.authDomain,
  projectId: Config.firebase.projectId,
  storageBucket: Config.firebase.storageBucket,
  messagingSenderId: Config.firebase.messagingSenderId,
  appId: Config.firebase.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export { auth, googleProvider, signInWithPopup, signOut, db, storage };
