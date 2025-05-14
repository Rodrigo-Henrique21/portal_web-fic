import { redirect } from "next/navigation";
export default function Home() {
  redirect("/portal");
  return <div className="min-h-screen"></div>;
}
