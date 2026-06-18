import { useState, useEffect } from "react";
import WalkingSpider from "./spiderwalk";

// ==========================================
// --- CENTRAL CONFIGURATION ---
// Update these values as the event phases change
// ==========================================
const CONFIG = {
  // Use ISO 8601 format. By default, this uses the user's local timezone.
  openDate: new Date("2026-05-22T11:30:00"),
  closeDate: new Date("2026-06-21T00:00:00"), // Updated to June 21, 2026
  
  labels: {
    notOpenMsg: "Proposal submissions are not yet open. Stay tuned.",
    closingInMsg: "Proposal submission closing in",
    closedMsg: "Proposal submission portal has been closed",
    buttonText: "Submit Proposal",
  },
  
  submissionUrl: "https://click.aiesec.lk/cs/idealize-2026-proposal-submission-document"
};

// ==========================================
// --- LOGIC HOOK ---
// ==========================================
function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// ==========================================
// --- UI COMPONENTS ---
// ==========================================
function Digit({ value, label, color, bgIcon }) {
  return (
    <div className={`group relative p-1 bg-gradient-to-br ${color} to-transparent`}>
      <div className="bg-surface relative overflow-hidden flex flex-col items-center justify-center py-4 px-2 md:py-8 md:px-6">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-[4rem] md:text-[8rem] text-white">{bgIcon}</span>
        </div>
        <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-secondary"></div>
        <div
          className="font-headline font-black text-3xl md:text-7xl text-white tabular-nums relative z-10"
          style={{ textShadow: "0 0 30px rgba(77,96,189,0.6)" }}
        >
          {String(value).padStart(2, "0")}
        </div>
        <div
          className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.3em] font-bold mt-2 md:mt-3 relative z-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#64748b" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Countdown() {
  const now = new Date();
  const isBeforeOpen = now < CONFIG.openDate;
  
  const { days, hours, minutes, seconds, isExpired } = useCountdown(CONFIG.closeDate);

  // Derived state to cleanly handle what UI to show
  const isActive = !isBeforeOpen && !isExpired;

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const units = [
    { value: days,    label: "Days",    color: "from-primary/30",   bgIcon: "calendar_today" },
    { value: hours,   label: "Hours",   color: "from-secondary/30", bgIcon: "schedule"       },
    { value: minutes, label: "Minutes", color: "from-primary/30",   bgIcon: "timer"          },
    { value: seconds, label: "Seconds", color: "from-blue-300/30",  bgIcon: "bolt"           },
  ];

  return (
    <section className="py-32 relative" id="countdown">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Dynamic Header Status */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 border border-primary/40 bg-primary/10">
            <span className={`w-2 h-2 rounded-full ${
              isBeforeOpen ? "bg-yellow-400 animate-pulse" :
              isExpired ? "bg-red-500" : "bg-primary animate-pulse"
            }`}></span>
            <span
              className="font-bold text-xs tracking-widest text-primary uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {isBeforeOpen 
                ? `Proposals open on ${CONFIG.openDate.toDateString()} at ${formatTime(CONFIG.openDate)}`
                : isExpired 
                ? CONFIG.labels.closedMsg
                : CONFIG.labels.closingInMsg}
            </span>
          </div>
        </div>

        {/* State 1: Active Countdown */}
        {isActive && (
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto">
            {units.map((unit) => (
              <Digit key={unit.label} {...unit} />
            ))}
          </div>
        )}

        {/* State 2: Expired Lock Screen */}
        {isExpired && !isBeforeOpen && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-7xl text-red-500 mb-4 block">lock</span>
            <p className="text-slate-400 uppercase tracking-widest font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {CONFIG.labels.closedMsg}
            </p>
          </div>
        )}

        {/* State 3: Not Yet Open */}
        {isBeforeOpen && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-7xl text-yellow-400 mb-4 block">hourglass_top</span>
            <p className="text-slate-400 uppercase tracking-widest font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {CONFIG.labels.notOpenMsg}
            </p>
          </div>
        )}

        {/* Call To Action (Only visible when active) */}
        {isActive && (
          <div className="text-center mt-12 md:mt-16">
            <button
              className="px-8 md:px-12 py-4 md:py-5 bg-primary text-white font-headline font-black uppercase tracking-widest text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-[8px_8px_0px_0px_rgba(77,96,189,0.4)]"
              onClick={() => window.open(CONFIG.submissionUrl, "_blank")}
            >
              {CONFIG.labels.buttonText}
            </button>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-4 font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Deadline: {CONFIG.closeDate.toDateString()} at {formatTime(CONFIG.closeDate)}
            </p>
          </div>
        )}

        {/* Spider Theme Component */}
        <div className="mt-16">
          <WalkingSpider count={2} size={80} speeds={[0.04, 0.07]} />
        </div>

      </div>
    </section>
  );
}
