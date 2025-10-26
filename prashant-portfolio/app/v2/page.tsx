"use client";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("./components/Galaxy/Galaxy"), { ssr: false });

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <Galaxy />
    </main>
  );
}
