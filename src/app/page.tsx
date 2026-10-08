import App from "@/components/App";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <App>
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Contact />
      </main>
    </App>
  );
}
