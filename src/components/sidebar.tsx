"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

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
          type="button"
          href={"/carga-horaria"}
          className={`menu-item ${
            pathname === "/carga-horaria" ? "active-sidebar-item" : ""
          }`}
          id="hours-charge-see-btn"
        >
          <i className="fa fa-file-excel"></i> Carga Horária
        </Link>
        <Link
          href={"/calendario"}
          className={`menu-item ${
            pathname === "/calendario" ? "active-sidebar-item" : ""
          }`}
          id="calendar-see-btn"
          type="button"
        >
          <i className="fa fa-calendar-alt"></i> Calendário
        </Link>
      </nav>
    </aside>
  );
};
