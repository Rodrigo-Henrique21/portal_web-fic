"use client";
import { logout } from "@/lib/logout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export const Sidebar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setRole(data.role);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <Image
          src="/senai-logo.png"
          alt="SENAI Logo"
          width={200}
          height={200}
          className="senai-logo"
        />
      </div>

      <nav className="menu">
        <a
          href="https://diariofic.sp.senai.br/"
          target="_blank"
          className="menu-item"
        >
          <i className="fa fa-external-link-alt"></i> Diário FIC
        </a>
        <Link
          href="/carga-horaria"
          className={`menu-item ${pathname === "/carga-horaria" ? "active-sidebar-item" : ""}`}
        >
          <i className="fa fa-file-excel"></i> Carga Horária
        </Link>
        <Link
          href="/calendario"
          className={`menu-item ${pathname === "/calendario" ? "active-sidebar-item" : ""}`}
        >
          <i className="fa fa-calendar-alt"></i> Calendário
        </Link>
        <a
          href="https://portalrh.sesisenaisp.org.br/arte/"
          target="_blank"
          className="menu-item"
        >
          <i className="fa fa-external-link-alt"></i> SAP
        </a>

        {role === "admin" && (
          <Link
            href="/usuarios"
            className={`menu-item ${pathname === "/usuarios" ? "active-sidebar-item" : ""}`}
          >
            <i className="fa fa-users"></i> Usuários
          </Link>
        )}

        <button
          onClick={logout}
          className="menu-item text-left w-full"
          type="button"
        >
          <i className="fa fa-sign-out-alt"></i> Sair
        </button>
      </nav>
    </aside>
  );
};
