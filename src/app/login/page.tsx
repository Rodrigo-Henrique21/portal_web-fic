"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { login } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push("/portal");
    } catch (error) {
      alert("Erro ao logar: " + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="senai-login-aside h-dvh w-[300px] hidden sm:flex">
        <Image
          width={300}
          height={300}
          src="/senai-logo.png"
          alt="SENAI Logo"
          className="senai-logo"
        />
        <h1>Portal FIC</h1>
        <Image
          width={300}
          height={300}
          src="/process-verify.svg"
          alt="Processo"
          className="senai-logo aside-image"
        />
      </aside>
      <main className="senai-login-main">
        <section className="senai-login-container">
          <h2>Acesse sua conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Label>Usuário</Label>
              <Input
                type="email"
                className="input form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <Label>Senha</Label>
              <Input
                className="input form-control"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Entrar</button>
          </form>
        </section>
      </main>
    </div>
  );
}
