import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import Cookies from "js-cookie";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    Cookies.set("authToken", token, { expires: 1 }); // 1 dia

    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
