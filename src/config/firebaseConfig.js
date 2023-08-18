import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDltoBJ1ucdUlmPEghYRsSDsvYghXmqSqo",
  authDomain: "crptotracker.firebaseapp.com",
  projectId: "crptotracker",
  storageBucket: "crptotracker.appspot.com",
  messagingSenderId: "616424237931",
  appId: "1:616424237931:web:33be310293c14ee2da7a2e"
};

const app = initializeApp(firebaseConfig);

export default firebaseConfig;