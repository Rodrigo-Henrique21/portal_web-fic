"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase-config";

export const Header = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email ?? null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="bg-white w-full flex justify-end py-1">
      <div className="user-info flex gap-2 justify-center items-center py-1">
        <p>
          Usuário: <strong>{email ?? "Carregando..."}</strong>
        </p>
        <Button
          variant={"ghost"}
          className="p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon />
        </Button>
      </div>
    </div>
  );
};
