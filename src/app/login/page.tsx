import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex ">
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
          <form action="/login" method="POST">
            <div className="input-group">
              <Label>Usuário</Label>
              <Input
                type="text"
                className="input form-control"
                id="username"
                name="username"
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
