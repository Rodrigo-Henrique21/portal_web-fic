import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUX3czNbsMJtyeO5y57uf7pjKr4Dnf6B0",
  authDomain: "portal-web-10cfa.firebaseapp.com",
  projectId: "portal-web-10cfa",
  storageBucket: "portal-web-10cfa.firebasestorage.app",
  messagingSenderId: "423296845445",
  appId: "1:423296845445:web:76b04be62f01b595ce8bec"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
