import { useEffect, useRef } from "react";
import background from "../assets/hero_back.svg";
import logo from "../assets/withname.png"; 

export default function Hero() {
  const canvasRef = useRef(null);

  const handleLearnMore = () => {
    const heroSection = canvasRef.current?.closest("section");
    const nextSection = heroSection?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId;
    const FONT_SIZE = 25;
    const CHARS = ["0", "1"];

    const COLOR_HEAD = "#a5b4fc"; 
    const COLOR_MID = "#4d60bd"; 
    const COLOR_TAIL = "#1e1b4b"; 

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let cols = Math.floor(canvas.width / FONT_SIZE);
    let drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
    let speeds = Array.from({ length: cols }, () => 0.2 + Math.random() * 0.115);
    let counters = Array.from({ length: cols }, () => 0);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.18)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`;

      cols = Math.floor(canvas.width / FONT_SIZE);

      while (drops.length < cols) {
        drops.push(Math.floor(Math.random() * -50));
        speeds.push(0.3 + Math.random() * 0.5);
        counters.push(0);
      }

      for (let i = 0; i < cols; i++) {
        counters[i] += speeds[i];
        if (counters[i] < 1) continue;
        counters[i] = 0;

        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        const TRAIL = 20;

        for (let t = 0; t < TRAIL; t++) {
          const ty = (drops[i] - t) * FONT_SIZE;
          if (ty < 0) continue;

          let alpha, color;
          if (t === 0) {
            color = COLOR_HEAD;
            alpha = 1;
          } else {
            const ratio = t / TRAIL;
            alpha = Math.max(0, 1 - ratio) * 0.85;
            color = t < TRAIL * 0.4 ? COLOR_MID : COLOR_TAIL;
          }

          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(char, x, ty);
        }

        ctx.globalAlpha = 1;
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    if (prefersReducedMotion) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      draw();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#1e1b4b] to-slate-950" />
        <div className="absolute inset-0 halftone-overlay text-blue-400/5" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          src={background}
          alt="background"
        />
      </div>

      {/* ── Matrix Rain Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1]"
        style={{ mixBlendMode: "screen", opacity: 0.55 }}
      />

      {/* ── Top Navbar Gradient Overlay ── */}
      <div className="absolute top-0 left-0 w-full h-52 bg-gradient-to-b from-[#1e1b4b] to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-950 to-transparent z-[2]" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full h-full px-4 md:px-6 text-center flex flex-col items-center justify-center pt-16 md:pt-20 -translate-y-16 md:-translate-y-24">
        
        {/* Logo - Main Visual (Pill badge was removed from here) */}
        <div className="flex items-center justify-center -mb-20 md:-mb-24">
          <img
            src={logo}
            alt="Idealize Logo"
            className="w-[20rem] h-auto md:w-[28rem] lg:w-[36rem] object-contain scale-[1.40] pointer-events-none drop-shadow-[0_0_50px_rgba(99,102,241,0.7)] transition-transform duration-500 hover:scale-[1.45]"
          />
        </div>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-slate-300 font-medium mb-4 leading-relaxed px-4">
          Empowering the next generation of tech leaders to weave new realities.
          <span className="block mt-1 text-slate-400">Break the canon. Build the future.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-md">
          <button
            className="w-full sm:w-auto px-6 md:px-10 py-2 md:py-3 bg-gradient-to-r from-primary to-secondary text-white font-headline font-bold uppercase tracking-widest text-xs md:text-sm rounded-lg hover:shadow-[0_0_30px_rgba(77,96,189,0.7)] active:scale-95 transition-all duration-200"
            onClick={() => window.open("https://tally.so/r/Np4V0p", "_blank")}
          >
            Register Now
          </button>
          <button
            className="w-full sm:w-auto px-6 md:px-10 py-2 md:py-3 border-2 border-primary/40 text-slate-200 font-headline font-bold uppercase tracking-widest text-xs md:text-sm rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-200"
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}