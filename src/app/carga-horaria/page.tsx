import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SheetUpload } from "@/components/uploadSheet";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="content px-4">
            <SheetUpload />
          </div>
        </div>
      </main>
    </div>
  );
}
