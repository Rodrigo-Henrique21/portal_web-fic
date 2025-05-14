import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="content px-4">
            <h1>Bem-vindo(a)!</h1>
            <p>Você está na página principal após login.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
