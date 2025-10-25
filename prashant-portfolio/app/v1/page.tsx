import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Philosophy from "./components/Philosphoy";
import Projects from "./components/Projects";

export default function Page() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Hero />
      <Journey />
      <Projects />
      <Philosophy />
      <Contact />
      {/* Next sections will be added here */}
    </main>
  );
}
