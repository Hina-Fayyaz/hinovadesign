type Topic = "contact" | "privacy-policy" | "refund-and-cancellation" | "terms-of-service" | "insights";
const captions: Record<Topic, [string, string]> = {
  contact: ["A conversation starts here", "Good ideas. Thoughtful design."],
  "privacy-policy": ["Thoughtful by design", "Your information, handled with care."],
  "refund-and-cancellation": ["Room for a clear next step", "Clarity at every stage."],
  "terms-of-service": ["A shared understanding", "A clear foundation for working together."],
  insights: ["Ideas to take forward", "From a little insight to a better experience."],
};
export function PageHeroGraphic({ topic }: { topic: string }) {
  const kind = topic in captions ? topic as Topic : "terms-of-service";
  const [label, caption] = captions[kind];
  return <div className={`page-graphic graphic-${kind}`} aria-hidden="true">
    <div className="graphic-orbit" /><div className="graphic-orbit orbit-two" />
    <div className="graphic-note"><span className="graphic-dot" />{label}</div>
    <div className="graphic-sheet">
      <div className="graphic-sheet-top"><span>HINOVA DESIGN</span><i /></div>
      <svg className="graphic-symbol" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {kind === "contact" ? <><rect x="20" y="32" width="120" height="88" rx="15" /><path d="m24 41 56 43 56-43M24 110l37-34m38 0 37 34" /><circle cx="125" cy="32" r="18" fill="#e4ef00" stroke="#111" /><path d="M125 24v16m-8-8h16" /></> : kind === "privacy-policy" ? <><path d="M80 16c18 15 34 20 52 23v39c0 31-22 53-52 66-30-13-52-35-52-66V39c18-3 34-8 52-23Z" /><rect x="57" y="69" width="46" height="37" rx="8" fill="#e4ef00" /><path d="M65 69V57a15 15 0 0 1 30 0v12m-15 17v6" /></> : kind === "refund-and-cancellation" ? <><rect x="35" y="35" width="91" height="93" rx="12" /><path d="M35 60h91M57 24v21m47-21v21m-44 43 15 14 28-29" /><path d="M17 72a66 66 0 0 1 121-28m-1-23 3 26-26-2" stroke="#6f0ca3" /><path d="M143 91a66 66 0 0 1-121 28m1 23-3-26 26 2" stroke="#6f0ca3" /></> : kind === "insights" ? <><path d="M26 37c23-6 39-2 54 10 15-12 31-16 54-10v86c-22-5-39-2-54 10-15-12-32-15-54-10V37Zm54 10v86M42 60l22 6m-22 15 22 6m32-21 22-6m-22 27 22-6" /><path d="M80 12v10m-29-8 5 9m53-9-5 9" stroke="#6f0ca3" /></> : <><path d="M39 19h55l28 28v93H39V19Zm55 0v28h28M56 63h48M56 82h35" /><circle cx="104" cy="115" r="27" fill="#e4ef00" /><path d="m91 115 9 9 18-19" /></>}
      </svg>
      <div className="graphic-lines"><i /><i /><i /></div>
    </div>
    <div className="graphic-seal"><svg viewBox="0 0 64 64" fill="none"><path d="M32 6v52M6 32h52M14 14l36 36M50 14 14 50" stroke="currentColor" strokeWidth="8" /></svg></div>
    <div className="graphic-caption">{caption}<span>↗</span></div>
  </div>;
}
