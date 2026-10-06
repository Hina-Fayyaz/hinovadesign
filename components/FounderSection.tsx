import Image from "next/image";
import { Arrow } from "./Icons";
import { siteContent, type Audience } from "@/content";

export function FounderSection({ audience }: { audience: Audience }) {
  const founder = siteContent[audience].founder;
  return (
    <section className="section founder-section" id="founder" aria-labelledby="founder-heading">
      <div className="container founder-panel founder-photo-panel" data-reveal>
        <div className="founder-identity">
          <p className="eyebrow">Founder / Creative Lead</p>
          <Image className="founder-portrait" src="/images/founder/hina-fayyaz.png" alt="Hina Fayyaz" width={1135} height={1386} sizes="(max-width:700px) 90vw, 34vw" />
          <span className="founder-name">Hina Fayyaz</span>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">Meet the founder</p>
          <h2 id="founder-heading">{founder.title}</h2>
          <p className="founder-role">{founder.role}</p>
          {founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="button button-dark founder-portfolio-link" href="/hinafayyaz/">
            View Hina’s Portfolio <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
