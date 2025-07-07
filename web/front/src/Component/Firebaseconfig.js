import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

  
const firebaseConfig = {
    apiKey: "AIzaSyBGLznebhxyv4KEATz6tpSArZMVSfRadXg",
    authDomain: "fyp-24-9120d.firebaseapp.com",
    databaseURL: "https://fyp-24-9120d-default-rtdb.firebaseio.com",
    projectId: "fyp-24-9120d",
    storageBucket: "fyp-24-9120d.appspot.com",
    messagingSenderId: "969226705935",
    appId: "1:969226705935:web:e9eab1ac6f509d78bf577a"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app); 
  
  export { app, db, auth, storage }; 