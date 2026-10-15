import { url } from "inspector";
import Link from "next/link";
import Hero from "@/app/components/home/Hero";
import About from "@/app/components/home/About";
import Team from "@/app/components/home/Team";
import CTA from "@/app/components/home/CTA";
import FAQ from "@/app/components/FAQ";
import Contact from "@/app/components/Contact";
import Testimonials from "@/app/components/home/Testimonials";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <About />
      <Team />
      <Testimonials />
      <CTA />
      <FAQ />
      <Contact />
    </main>
  );
}
