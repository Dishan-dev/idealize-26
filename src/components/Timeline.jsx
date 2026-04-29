const events = [
  {
    title: "Registrations & Kickoff",
    desc: "Register for the competition and attend the introductory sessions to get started.",
    date: "WEEK 1 - 2",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "right",
    dotSize: "w-4 h-4",
  },
  {
    title: "Agentic AI Knowledge Sessions",
    desc: "Foundational sessions covering Agentic AI concepts and autonomous system design.",
    date: "WEEK 3",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "left",
    dotSize: "w-4 h-4",
  },
  {
    title: "Proposal Closing",
    desc: "Final deadline to submit your project proposal and development roadmap.",
    date: "WEEK 4",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "right",
    dotSize: "w-4 h-4",
  },
  {
    title: "Agentic AI Mini Competition Opening",
    desc: "The Mini Competition officially opens — teams begin competing with their Agentic AI solutions.",
    date: "WEEK 5",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "left",
    dotSize: "w-5 h-5",
  },
  {
    title: "Prototype Submission Opening",
    desc: "The prototype submission window opens for teams to begin submitting their initial builds.",
    date: "WEEK 6",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "right",
    dotSize: "w-5 h-5",
  },
  {
    title: "Advanced Agentic AI Sessions",
    desc: "Specialized sessions on advanced agent behaviors, multi-agent coordination, and scaling AI solutions.",
    date: "WEEK 7 - 8",
    color: "text-white",
    dotColor: "bg-white shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]",
    borderColor: "border-white/20",
    align: "left",
    dotSize: "w-5 h-5",
  },
  {
    title: "Prototype Closing",
    desc: "Prototype submission window closes — all builds must be finalized and submitted.",
    date: "WEEK 9",
    color: "text-white",
    dotColor: "bg-violet-500 shadow-[0_0_15px_4px_rgba(139,92,246,0.6)]",
    borderColor: "border-violet-400/20",
    align: "right",
    dotSize: "w-6 h-6",
  },
  {
    title: "Mini Competition Closing & Go-to-Market",
    desc: "Mini Competition submissions close and teams transition into the Go-to-Market phase.",
    date: "WEEK 10",
    color: "text-white",
    dotColor: "bg-violet-500 shadow-[0_0_15px_4px_rgba(139,92,246,0.6)]",
    borderColor: "border-violet-400/20",
    align: "left",
    dotSize: "w-6 h-6",
  },
  {
    title: "Semi-Finals",
    desc: "Shortlisted teams present their solutions to an expert judging panel.",
    date: "WEEK 11",
    color: "text-blue-400",
    dotColor: "bg-blue-400 shadow-[0_0_15px_4px_rgba(96,165,250,0.6)]",
    borderColor: "border-blue-400/20",
    align: "right",
    dotSize: "w-6 h-6",
  },
  {
    title: "Grand Finale",
    desc: "Finalists are announced and winners are crowned at the Grand Finale.",
    date: "WEEK 12 - 13",
    color: "text-primary",
    dotColor: "bg-primary shadow-[0_0_20px_6px_rgba(77,96,189,0.7)]",
    borderColor: "border-primary/20",
    align: "left",
    dotSize: "w-8 h-8",
  },
];

import { useRef, useState, useEffect } from "react";

export default function Timeline() {
  const containerRef = useRef(null);
  const firstDotRef = useRef(null);
  const lastDotRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !firstDotRef.current || !lastDotRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const firstTop = firstDotRef.current.getBoundingClientRect().top + window.scrollY;
      const lastTop = lastDotRef.current.getBoundingClientRect().top + window.scrollY;
      setLineStyle({
        top: firstTop - containerTop,
        height: lastTop - firstTop,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="py-32 bg-slate-900/50 relative overflow-hidden" id="timeline">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Event <span className="text-blue-500">Timeline</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-blue-600 to-blue-300 mt-5"></div>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Line — top and height driven by first/last dot positions */}
          <div
            className="absolute left-8 md:left-1/2 w-[3px] bg-gradient-to-b from-white via-violet-500 to-primary opacity-40 -translate-x-1/2 pointer-events-none"
            style={{ top: lineStyle.top, height: lineStyle.height }}
          />

          <div className="space-y-16">
            {events.map((event, i) => {
              const isFirst = i === 0;
              const isLast = i === events.length - 1;

              const dot = (
                <div
                  ref={isFirst ? firstDotRef : isLast ? lastDotRef : null}
                  className={`
                    absolute left-8 md:left-1/2 -translate-x-1/2
                    ${event.dotSize} ${event.dotColor}
                    rotate-45 z-10
                    transition-all duration-300
                    hover:scale-150 hover:brightness-125
                    cursor-default
                  `}
                />
              );

              const card = (
                <div
                  className={`
                    group relative border ${event.borderColor} bg-slate-900/60
                    p-4 transition-all duration-300
                    hover:bg-slate-800/80 hover:border-opacity-60 hover:-translate-y-1 hover:shadow-lg
                  `}
                >
                  <h4 className={`${event.color} font-headline font-black text-xl uppercase`}>
                    {event.title}
                  </h4>
                  <p className="text-slate-400 text-sm mt-1">{event.desc}</p>
                  <span
                    className={`inline-block mt-2 font-bold text-xs bg-slate-800 px-2 py-1 border ${event.borderColor} text-slate-300`}
                  >
                    {event.date}
                  </span>
                </div>
              );

              return (
                <div key={i} className="relative flex flex-col md:flex-row items-center">
                  {event.align === "right" ? (
                    <>
                      <div className="flex-1 md:text-right md:pr-16 order-2 md:order-1 w-full pl-20 md:pl-0">
                        {card}
                      </div>
                      {dot}
                      <div className="flex-1 order-3 hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1 order-3 w-full pl-20 md:pl-16">{card}</div>
                      {dot}
                      <div className="flex-1 md:text-right md:pr-16 order-2 hidden md:block" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}