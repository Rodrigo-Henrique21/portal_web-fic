"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="bg-white w-full flex justify-end py-1">
      <div className="user-info flex gap-2 justify-center items-center py-1">
        <p>
          Usuário: <strong>RODRIGO HENRIQUE CORREA</strong>
        </p>
        <Button variant={"ghost"} className="p-2 cursor-pointer">
          <LogOutIcon />
        </Button>
      </div>
    </div>
  );
};
