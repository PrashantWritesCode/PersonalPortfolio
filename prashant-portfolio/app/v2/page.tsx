"use client";
import dynamic from "next/dynamic";
import UIOverlay from "./components/UIOverlay";

// Dynamically load the 3D scene (avoids SSR issues)
const GalaxyScene = dynamic(() => import("./components/GalaxyScene"), { ssr: false });

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <GalaxyScene />
      <UIOverlay />
    </main>
  );
}
