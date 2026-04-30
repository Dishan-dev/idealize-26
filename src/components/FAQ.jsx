import { useState } from "react";
import WalkingSpider from "./spiderwalk";

const faqs = [
  {
    num: "01.",
    color: "text-primary",
    hoverBorder: "hover:border-primary/50",
    question: "How many members can be in one team?",
    answer: "For the School category, teams can have 2-5 members. For the Open category, teams can have 2-5 members. All team members should be registered through the official registration form.",
  },
  {
    num: "02.",
    color: "text-secondary",
    hoverBorder: "hover:border-secondary/50",
    question: "Do all team members need to be from the same university or school?",
    answer: "No, team members can be from different institutions. This encourages diverse collaboration and allows you to form the best team possible regardless of institutional affiliations.",
  },
  {
    num: "03.",
    color: "text-blue-300",
    hoverBorder: "hover:border-blue-300/50",
    question: "Do we need to have prior app and web development knowledge?",
    answer: "While some basic knowledge is helpful, it's not mandatory. We provide workshops and mentoring sessions to help beginners. Teams with mixed skill levels often perform well as they combine different perspectives.",
  },
  {
    num: "04.",
    color: "text-primary",
    hoverBorder: "hover:border-primary/50",
    question: "Are there any specific platforms or technologies that must be used?",
    answer: "No, you have the freedom to choose any platform or technology stack that best suits your project. This includes web, mobile (Android/iOS), or cross-platform solutions. The focus is on innovation and solving the problem effectively.",
  },
  {
    num: "05.",
    color: "text-secondary",
    hoverBorder: "hover:border-secondary/50",
    question: "Will we be awarded for participation?",
    answer: "Yes, all participants will receive a certificate of participation. Additionally, there are various category awards and special recognition for outstanding projects even if they don't win the main prizes.",
  },
  {
    num: "06.",
    color: "text-blue-300",
    hoverBorder: "hover:border-blue-300/50",
    question: "Can we work on an existing project or idea?",
    answer: "Projects must be original and developed specifically for Idealize 2026. However, you can build upon previous concepts if they are substantially improved or reimagined for this competition.",
  },
  {
    num: "07.",
    color: "text-primary",
    hoverBorder: "hover:border-primary/50",
    question: "Is there any registration fee?",
    answer: "No, participation in Idealize 2026 is completely free of charge. We believe in providing equal opportunities for all talented individuals regardless of financial background.",
  },
];
export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-32 relative" id="faq">
      
      <div className="max-w-[800px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-16 border-b border-slate-800 pb-4">
          <div className="w-3 h-3 bg-primary animate-pulse"></div>
          <h2 className="font-headline font-black text-4xl uppercase italic tracking-tighter">FAQ</h2>
          <span className="ml-auto text-slate-500 font-mono text-xs"></span>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`group bg-slate-900/50 border border-slate-800/50 ${faq.hoverBorder} transition-colors`}
            >
              <button
                className="flex items-center justify-between p-6 w-full text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className={`${faq.color} font-mono text-xs`}>{faq.num}</span>
                  <span className="font-bold uppercase tracking-widest text-sm text-slate-200">{faq.question}</span>
                </div>
                <span className={`material-symbols-outlined text-slate-500 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>
                  keyboard_arrow_down
                </span>
              </button>
              {open === i && (
                <div className="px-16 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/30 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
<div className="mt-16">
  <WalkingSpider count={1} size={100} speeds={[0.05]} />
</div>

      </div>
    </section>
  );
}
