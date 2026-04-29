import { useRef, useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/categories";
import Awards from "./components/Awards";
import Timeline from "./components/Timeline";
import Sponsors from "./components/Sponsors";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollArrow from "./components/ScrollArrow";
import Countdown from "./components/countdown";
import Memories from "./components/memory";
import SpiderLoader from "./components/Loader";

const SECTIONS = ["hero", "about", "categories", "awards", "timeline", "memories", "partners", "faq"];

export default function App() {
  const containerRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState("hero");
  const [loading, setLoading] = useState(true);

  // Helper to register refs for IntersectionObserver
  const registerRef = useCallback((id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  // Smooth Scroll Logic
  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollToNext = useCallback((currentId) => {
    const idx = SECTIONS.indexOf(currentId);
    if (idx < SECTIONS.length - 1) scrollToSection(SECTIONS[idx + 1]);
  }, [scrollToSection]);

  const scrollToTop = useCallback(() => scrollToSection(SECTIONS[0]), [scrollToSection]);

  // Preloader Logic: Wait for window load
  useEffect(() => {
    const handleLoad = () => {
      // Small timeout ensures the transition isn't jarring if the site loads instantly
      setTimeout(() => setLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Section observers for Navbar highlighting
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: null, // observe relative to viewport
          threshold: 0.4 // trigger when 40% of section is visible
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [loading]); // Re-run observer setup once loading is finished and DOM is stable

  return (
    <div className="dark bg-slate-950 text-white min-h-screen selection:bg-red-500 selection:text-white">

      {/* 1. Spider-Man Preloader Overlay */}
      {/* Preloader */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-start bg-slate-950 transition-all duration-1000 ease-in-out ${loading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Full height container so rope appears pinned to top */}
        <div className="w-full h-2/3">
          <SpiderLoader />
        </div>

        <p
          className="text-white font-black uppercase tracking-[0.4em] text-xs animate-pulse"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Swinging into action...
        </p>
      </div>

      {/* 2. Main Website Content */}
      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>

        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

        <main id="scroll-container" ref={containerRef} className="relative">

          <section className="snap-section min-h-screen" ref={registerRef("hero")}>
            <Hero />
            <Countdown />
            <ScrollArrow onClick={() => scrollToNext("hero")} />
          </section>

          <section className="snap-section min-h-screen" ref={registerRef("about")}>
            <About />
            <ScrollArrow onClick={() => scrollToNext("about")} />
          </section>

          <section className="snap-section min-h-screen" ref={registerRef("categories")}>
            <Categories />
            <ScrollArrow onClick={() => scrollToNext("categories")} />
          </section>

          <section className="snap-section min-h-screen" ref={registerRef("awards")}>
            <Awards />
            <ScrollArrow onClick={() => scrollToNext("awards")} />
          </section>

          <section className="snap-section min-h-screen" ref={registerRef("timeline")}>
            <Timeline />
            <ScrollArrow onClick={() => scrollToNext("timeline")} />
          </section>

          <section className="snap-section min-h-screen" ref={registerRef("memories")}>
            <Memories />
            <ScrollArrow onClick={() => scrollToNext("memories")} />
          </section>

          {/* Note: In your original code, "partners" was duplicated. 
              I kept both as requested but they share the same ID. */}
          <section className="snap-section min-h-screen" ref={registerRef("partners")}>
            <Sponsors />
            <ScrollArrow onClick={() => scrollToNext("partners")} />
          </section>

          <section className="snap-section-faq min-h-screen flex flex-col" ref={registerRef("faq")}>
            <FAQ />
            <div className="mt-auto">
              <Footer scrollToSection={scrollToSection} />
              <ScrollArrow isLast onClick={scrollToTop} />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}