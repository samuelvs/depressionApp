import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGFhTNSQpdSXT4DJ174v-V0-LMwqqB2kU",
    authDomain: "pgmv-cd599.firebaseapp.com",
    projectId: "pgmv-cd599",
    storageBucket: "pgmv-cd599.appspot.com",
    messagingSenderId: "691118601860",
    appId: "1:691118601860:web:0d70de68b46454561d74d1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;