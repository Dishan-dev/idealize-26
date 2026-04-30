import logo from "../assets/idealizelogo.svg";
import HangingSpider from "./hanging";

//dele book link
const DELEGATE_BOOKLET_LINK = "click.aiesec.lk/cs/idealize-2026-delegate-booklet";

const tracks = [
  {
    icon: "lightbulb",
    bgIconName: "rocket_launch",
    title: "LEARN",
    description: "Gain valuable insights from industry experts and enhance your technical skills through workshops and mentoring sessions.",
    variant: "blue",
  },
  {
    icon: "code",
    bgIconName: "terminal",
    title: "CREATE",
    description: "Develop innovative mobile and web applications that solve real-world business challenges and showcase your creativity.",
    variant: "indigo",
  },
  {
    icon: "volunteer_activism",
    bgIconName: "public",
    title: "NETWORK",
    description: "Network with like-minded individuals, potential employers, and industry leaders to expand your professional connections.",
    variant: "violet",
  },
];

const VARIANTS = {
  blue: {
    accent: "#60a5fa",
    accentStrong: "#3b82f6",
    accentMuted: "rgba(59,130,246,0.12)",
    borderIdle: "rgba(59,130,246,0.35)",
    borderHover: "rgba(59,130,246,0.9)",
    glowHover: "0 0 40px rgba(59,130,246,0.22), inset 0 0 40px rgba(59,130,246,0.04)",
    scan: "linear-gradient(90deg, transparent, #60a5fa, transparent)",
    cornerBr: "#818cf8",
    radialColor: "rgba(59,130,246,0.09)",
  },
  indigo: {
    accent: "#818cf8",
    accentStrong: "#6366f1",
    accentMuted: "rgba(99,102,241,0.12)",
    borderIdle: "rgba(99,102,241,0.35)",
    borderHover: "rgba(99,102,241,0.9)",
    glowHover: "0 0 40px rgba(99,102,241,0.22), inset 0 0 40px rgba(99,102,241,0.04)",
    scan: "linear-gradient(90deg, transparent, #818cf8, transparent)",
    cornerBr: "#60a5fa",
    radialColor: "rgba(99,102,241,0.09)",
  },
  violet: {
    accent: "#a78bfa",
    accentStrong: "#7c3aed",
    accentMuted: "rgba(124,58,237,0.12)",
    borderIdle: "rgba(124,58,237,0.35)",
    borderHover: "rgba(124,58,237,0.9)",
    glowHover: "0 0 40px rgba(124,58,237,0.22), inset 0 0 40px rgba(124,58,237,0.04)",
    scan: "linear-gradient(90deg, transparent, #a78bfa, transparent)",
    cornerBr: "#60a5fa",
    radialColor: "rgba(124,58,237,0.09)",
  },
};

import { useEffect, useRef } from "react";

function TrackCard({ track }) {
  const cardRef = useRef(null);
  const radialRef = useRef(null);
  const scanRef = useRef(null);
  const v = VARIANTS[track.variant];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (radialRef.current) {
        radialRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, ${v.radialColor}, transparent 70%)`;
      }
    };

    const onEnter = () => {
      card.style.borderColor = v.borderHover;
      card.style.boxShadow = v.glowHover;
      if (radialRef.current) radialRef.current.style.opacity = "1";
      if (scanRef.current) {
        scanRef.current.style.opacity = "1";
        scanRef.current.style.animation = "track-scan 2s linear infinite";
      }
    };

    const onLeave = () => {
      card.style.borderColor = v.borderIdle;
      card.style.boxShadow = "none";
      if (radialRef.current) radialRef.current.style.opacity = "0";
      if (scanRef.current) {
        scanRef.current.style.opacity = "0";
        scanRef.current.style.animation = "none";
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: "#0f172a",
        border: `1px solid ${v.borderIdle}`,
        padding: "2rem",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        height: "100%",
      }}
    >
      {/* HUD corners */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "1.25rem", height: "1.25rem", borderTop: `2px solid ${v.accentStrong}`, borderLeft: `2px solid ${v.accentStrong}` }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "1.25rem", height: "1.25rem", borderBottom: `2px solid ${v.cornerBr}`, borderRight: `2px solid ${v.cornerBr}` }} />

      {/* Cursor radial glow */}
      <div ref={radialRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.4s", pointerEvents: "none" }} />

      {/* Scan line */}
      <div
        ref={scanRef}
        style={{
          position: "absolute",
          top: 0,
          left: "-60%",
          width: "60%",
          height: "1px",
          background: v.scan,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Ghost icon */}
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          top: "1rem", right: "1rem",
          fontSize: "7rem",
          opacity: 0.06,
          pointerEvents: "none",
          userSelect: "none",
          color: v.accent,
          fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
        }}
      >
        {track.bgIconName}
      </span>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Icon badge */}
        <div style={{
          width: "2.75rem", height: "2.75rem",
          background: v.accentMuted,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1.5rem",
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: "1.4rem", color: v.accent }}>
            {track.icon}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "1.5rem",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          color: "#f1f5f9",
          lineHeight: 1,
          marginBottom: "1rem",
          marginTop: 0,
        }}>
          {track.title}
        </h3>

        {/* Description */}
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
          {track.description}
        </p>

      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="py-32 relative bg-slate-900/50 overflow-hidden" id="about">
      <style>{`
        @keyframes track-scan {
          0%   { left: -60%; }
          100% { left: 140%; }
        }
      `}</style>

      <HangingSpider side="right" offsetX={60} ropeLength={80} size={80} swayAmount={10} swaySpeed={3} />

      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 text-[200px] font-headline font-black text-white/[0.03] leading-none select-none">
            INFO
          </div>
          <h2 className="font-headline font-black text-5xl uppercase italic mb-8 relative">
            What is IDEALIZE 2026 <br /> <span className="text-secondary"></span>
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              IDEALIZE 2026 is an island-wide Mobile App and Web Development competition organized by AIESEC in University of Moratuwa. It gives participants the chance to design and build real mobile and web applications while working alongside experienced industry professionals  turning ideas into fully functional products.
            </p>
            <p>
              Whether you're an experienced developer or someone just starting out, IDEALIZE 2026 is a platform to develop your skills, gain hands on experience, and showcase your creativity to a wider audience.
            </p>
            <p>
              This year also brings an exciting new addition  a mini <span className="text-primary font-semibold">AI Agent & MCP challenge</span>, giving participants a chance to explore the frontier of intelligent, tool connected AI systems on the side.
            </p>
            <p>
              The competition is open to all Sri Lankan youth, regardless of IT background or experience level. No prior knowledge needed  just bring your ideas and enthusiasm!
            </p>
          </div>
          <div className="mt-12 flex gap-10">
            <a href={DELEGATE_BOOKLET_LINK} target="_blank" rel="noopener noreferrer" className="w-50VH md:w-auto px-10 py-5 bg-primary text-white font-headline font-black uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all shadow-[8px_8px_0px_0px_rgba(77,96,189,0.5)] inline-block text-center">
              Download the Delegate Booklet
            </a>
          </div>
        </div>

        <div className="relative group hidden md:block">
          <img src={logo} alt="futuristic hardware circuitry" />
        </div>
      </div>

      {/* Tracks section */}
      <section className="py-20 relative" id="tracks">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <TrackCard key={track.title} track={track} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}