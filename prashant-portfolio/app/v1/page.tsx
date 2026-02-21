import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Journey from "./components/Journey";

import Projects from "./components/Projects";
import Products from "./components/Products";
import Skills from "./components/Skills";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

export default function Page() {
  return (
    <main className="bg-deep-bg text-neutral-100 overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      <Hero />
      <Projects />
      <Products />
      <Skills />
      <Journey />

      <Contact />
    </main>
  );
}
