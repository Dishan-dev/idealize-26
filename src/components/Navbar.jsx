import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

const links = [
  { label: "About", id: "about" },
  { label: "Categories", id: "categories" },
  { label: "Awards", id: "awards" },
  { label: "Timeline", id: "timeline" },
  { label: "Partners", id: "partners" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar({ activeSection, scrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollTop > 10);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id) => {
    scrollToSection?.(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${scrolled
      ? "bg-slate-950/80 backdrop-blur-xl border-b border-blue-500/20 shadow-[0_0_30px_rgba(77,96,189,0.15)]"
      : "bg-transparent border-b border-transparent"
      }`}>
      <style>{`
        .nav-link {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          transition: color 0.2s ease, text-shadow 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #93c5fd;
          text-shadow: 0 0 14px rgba(96,165,250,0.9);
        }
        .nav-link.active {
          color: #ffffff;
          text-shadow: 0 0 14px rgba(96,165,250,0.9);
        }
        .register-btn {
          padding: 0.55rem 1.6rem;
          border-radius: 9999px;
          background: #3d52a0;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .register-btn:hover {
          background: #4d60bd;
          box-shadow: 0 0 22px rgba(77,96,189,0.55);
        }
        .register-btn:active { transform: scale(0.96); }

        .logo-slot {
          /* Reserves the same space as before so layout doesn't shift */
          width: 12rem;
          flex-shrink: 0;
          position: relative;
        }

        .logo-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          /* Pull it out of flow so it doesn't stretch the navbar */
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 60;
        }

        .logo-img {
          height: 9rem;
          width: 9rem;
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 4px 16px rgba(77,96,189,0.4));
        }
      `}</style>

      <div
        className="flex justify-between items-center w-full px-6 lg:px-10"
        style={{ fontFamily: "'Space Grotesk', sans-serif", minHeight: '5rem' }}
      >

        {/* Logo slot — keeps layout width, logo itself floats outside nav height */}
        <div className="logo-slot">
          <button onClick={() => handleNav("hero")} className="logo-btn">
            <img src={logo} alt="AIESEC" className="logo-img" />
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(({ label, id }) => (
            <button key={label} onClick={() => handleNav(id)}
              className={`nav-link ${(activeSection === id || (id === "partners" && activeSection === "memories")) ? "active" : ""}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Desktop register */}
        <button className="register-btn hidden lg:block" onClick={() => window.open("https://tally.so/r/Np4V0p", "_blank")}>
          Register Now
        </button>

        {/* Mobile: register + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button className="register-btn" onClick={() => window.open("https://tally.so/r/Np4V0p", "_blank")}>
            Register
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1">
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>


      {/* Mobile dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="bg-slate-950/95 backdrop-blur-xl border-t border-blue-500/20 px-6 py-5 flex flex-col gap-5">
          {links.map(({ label, id }) => (
            <button key={label} onClick={() => handleNav(id)}
              className={`nav-link text-left ${activeSection === id ? "active" : ""}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}