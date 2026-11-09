import { Nav } from "@/components/Nav";
import { Splash } from "@/components/Splash";
import { Hero } from "@/components/Hero";
import { CaseStudy } from "@/components/CaseStudy";
import { Platform } from "@/components/Platform";
import { Approach, Contact, Footer, Lab, Skills } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Splash />
      <Nav />
      <main className="wrap">
        <Hero />
        <CaseStudy />
        <Platform />
        <Approach />
        <Skills />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
