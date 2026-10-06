import { PageHeroGraphic } from "./PageHeroGraphic";
import Link from "next/link";
import { InnerPageShell } from "./InnerPageShell";
import { Arrow } from "./Icons";
import type { Policy } from "@/content/policies";

export function PolicyPage({ policy, slug }: { policy: Policy; slug: string }) {
  return <InnerPageShell scope={slug}>
    <section className="inner-hero policy-hero">
      <div className="container inner-hero-grid">
        <div><p className="eyebrow">Hinova Design / Website information</p><h1>{policy.title}</h1><p className="inner-lead">{policy.lead}</p></div>
        <PageHeroGraphic topic={slug} />
      </div>
    </section>
    <section className="section policy-body"><div className="container policy-layout">
      <aside className="policy-aside"><span className="eyebrow">On this page</span><nav aria-label={`${policy.title} sections`}>{policy.sections.map((section, i) => <a key={section.title} href={`#section-${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span>{section.title}</a>)}</nav><p>Updated 6 October 2026</p></aside>
      <div className="policy-sections">{policy.sections.map((section, i) => <section className="policy-card" key={section.title} id={`section-${i + 1}`} data-reveal><span className="policy-number">{String(i + 1).padStart(2, "0")}</span><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
        <div className="policy-contact"><h2>Have a question?</h2><p>We’re happy to clarify how this applies to your inquiry or project.</p><Link className="button button-dark" href="/contact/">Contact Hinova <Arrow /></Link></div>
      </div>
    </div></section>
  </InnerPageShell>;
}
