import Image from "next/image";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ServiceTabs } from "./ServiceTabs";
import { BlogSection } from "./BlogSection";
import { MotionEffects } from "./MotionEffects";
import { TeamSection } from "./TeamSection";
import { FounderSection } from "./FounderSection";
import { Arrow, Check, Clock, Video, ServiceIcon } from "./Icons";
import { Logo } from "./Logo";
import { siteContent, strategyCallUrl, type Audience } from "@/content";
const heroPortraits = [
  { name: "Jeroen van Ommen", file: "jeroen-van-ommen.jpg" },
  { name: "Malene Kai Bell", file: "malene-kai-bell.jpg" },
  { name: "Milane Hughes", file: "milane-hughes.jpeg" },
  { name: "Patsy Cisneros", file: "patsy-cisneros.jpeg" },
  { name: "Scott Neil", file: "scott-neil.png" },
];
export function AudiencePage({ audience }: { audience: Audience }) {
  const c = siteContent[audience];
  const educator = audience === "educators";
  return (
    <div className={`audience-page ${audience}`}>
      <MotionEffects scope={audience} />
      <Header audience={audience} />
      <main id="main-content">
        <section className="hero" aria-labelledby="page-heading">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 id="page-heading">
                {c.heroTitle} <span>{c.heroHighlight}</span>
              </h1>
              <p className="hero-lead">{c.heroParagraphs[0]}</p>
              <div className="hero-action-band">
                <a className="button button-acid hero-booking-button" href={strategyCallUrl}>
                  Book a Free Strategy Call <Arrow />
                </a>
                <div className="hero-expertise">
                  <div className="hero-portraits">
                    {heroPortraits.map((portrait) => (
                      <span key={portrait.file}>
                        <Image src={`/images/portraits/${portrait.file}`} alt={portrait.name} width={52} height={52} className={portrait.file === "malene-kai-bell.jpg" ? "portrait-malene" : undefined} />
                      </span>
                    ))}
                  </div>
                  <span>Courses and<br />learning resources</span>
                </div>
              </div>
              <p className="hero-support">{c.heroSupport}</p>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src={educator ? "/images/agency/collaborative-workspace.webp" : "/images/agency/coaching-workspace.webp"}
                  alt={
                    educator
                      ? "Colleagues working together on laptops in a bright workspace"
                      : "A woman working at a laptop beside a sunlit window"
                  }
                  fill
                  sizes="(max-width:900px) 90vw, 43vw"
                  priority
                />
              </div>
              <div className="hero-note">
                <span className="note-icon">
                  <ServiceIcon kind={educator ? 0 : 1} />
                </span>
                <div>
                  <span>
                    {educator
                      ? "From syllabus to learning"
                      : "From expertise to learning"}
                  </span>
                  <p>
                    {educator
                      ? "Plan. Develop. Deliver."
                      : "Your approach. Thoughtfully designed."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container hero-bottom">
            <span className="platform-label">Course platform support</span>
            <div className="platforms">
              <span>Kajabi</span>
              <span>Thinkific</span>
              <span>Teachable</span>
            </div>
          </div>
        </section>
        <section
          className="section needs-section"
          aria-labelledby="needs-heading"
        >
          <div className="container">
            <div className="section-heading two-column" data-reveal>
              <div>
                <p className="eyebrow">Your starting point</p>
                <h2 id="needs-heading">{c.needs.title}</h2>
              </div>
              <div className="intro-copy">
                <p className="lead">{c.needs.intro}</p>
                <p>{c.heroParagraphs[1]}</p>
              </div>
            </div>
            <div className="challenge-grid">
              {c.needs.items.map((item, i) => (
                <div className="challenge" key={item} data-reveal data-reveal-delay={i * 70}>
                  <span className="challenge-icon" aria-hidden="true"><ServiceIcon kind={i} /></span>
                  <span className="number">0{i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="closing-note">{c.needs.close}</p>
          </div>
        </section>
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading centered" data-reveal>
              <p className="eyebrow">Our services</p>
              <h2>{c.servicesTitle}</h2>
              <p className="lead">{c.servicesIntro}</p>
            </div>
            <ServiceTabs services={c.services} />
            <div className="service-inquiry">
              <Link className="button button-dark" href={`/${audience}/start-project/`}>
                Project Inquiry Form <Arrow />
              </Link>
            </div>
          </div>
        </section>
        <section className="section ways-section" id="ways-to-begin">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Ways to begin</p>
              <h2>{c.startingTitle}</h2>
            </div>
            <div className="starting-grid">
              {c.starting.map((s, i) => (
                <article
                  className={`starting-card starting-${i}`} data-reveal data-reveal-delay={i * 90}
                  key={s.title}
                >
                  <div className="starting-top">
                    <ServiceIcon kind={i === 2 ? 3 : i} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
            <p className="scope-note">{c.scopeNote}</p>
          </div>
        </section>
        <section className="section process-section" id="process">
          <div className="container process-layout">
            <div className="process-intro" data-reveal>
              <p className="eyebrow">How we work</p>
              <h2>{c.processTitle}</h2>
              <div className="process-photo">
                <Image
                  src="/images/agency/creative-process.webp"
                  alt="Designers reviewing color palettes and printed materials together"
                  fill
                  sizes="(max-width:900px) 90vw, 34vw"
                />
              </div>
            </div>
            <div className="process-grid">
              {c.process.map((p, i) => (
                <article key={p.title} data-reveal data-reveal-delay={i % 2 * 90}>
                  <span className="process-number">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <TeamSection />
        <FounderSection audience={audience} />
        <section className="section faq-section" id="questions">
          <div className="container faq-layout">
            <div>
              <p className="eyebrow">Common questions</p>
              <h2>{c.faqTitle}</h2>
              <a href="#strategy-call" className="button button-dark">
                Let’s talk <Arrow />
              </a>
            </div>
            <div className="faq-list">
              {c.faq.map((q, i) => (
                <details key={q.question} name="questions" data-reveal>
                  <summary>
                    <span>{q.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p>{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section strategy-section" id="strategy-call">
          <div className="container">
            <div className="section-heading centered" data-reveal>
              <p className="eyebrow">A practical first conversation</p>
              <h2>{c.strategy.title}</h2>
            </div>
            <div className="strategy-card" data-reveal>
              <div className="strategy-info">
                <Logo />
                <div className="strategy-symbol" aria-hidden="true">
                  <Image src="/brand/mark.svg" width={98} height={98} alt="" />
                </div>
                <h3>{c.strategy.callTitle}</h3>
                <div className="call-meta">
                  <span>
                    <Clock />
                    45 minutes
                  </span>
                  <span>
                    <Video />
                    Online
                  </span>
                  <span className="free-tag">Free</span>
                </div>
                <p>{c.strategy.description}</p>
              </div>
              <div className="strategy-action">
                <h3>
                  Book your free
                  <br />
                  45-minute strategy call
                </h3>
                <p className="topics-label">On the call we can discuss</p>
                <ul>
                  {c.strategy.topics.map((t) => (
                    <li key={t}>
                      <Check />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="strategy-note">{c.strategy.note}</p>
                <p className="schedule-note">
                  Choose a time that works for you on our booking page.
                </p>
                <a
                  className="button button-dark"
                  href={strategyCallUrl}
                >
                  Book a Free Strategy Call <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
        <BlogSection />
      </main>
      <Footer audience={audience} />
    </div>
  );
}
