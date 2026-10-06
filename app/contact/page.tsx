import { PageHeroGraphic } from "@/components/PageHeroGraphic";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { ContactForm } from "@/components/ContactForm";
import { Arrow, InstagramIcon, LinkedInIcon } from "@/components/Icons";
import { contactEmail, strategyCallUrl } from "@/content";
export const metadata: Metadata = { title: "Contact Us", description: "Get in touch with Hinova Design about course, learning resource or document design.", alternates: { canonical: "/contact/" } };
export default function Page() {
  return <InnerPageShell scope="contact">
    <section className="inner-hero contact-hero"><div className="container inner-hero-grid"><div><p className="eyebrow">Contact Hinova</p><h1>Let’s create something <em>useful.</em></h1><p className="inner-lead">Have a course, resource or design project in mind? Tell us where you are starting and we’ll find the next step together.</p></div><PageHeroGraphic topic="contact" /></div></section>
    <section className="section contact-section"><div className="container contact-layout">
      <ContactForm />
      <aside className="contact-info" aria-label="Contact information" data-reveal><span className="eyebrow">Get in touch</span><h2>We’d love to hear from you.</h2><p>Use the form or email us directly. For a conversation about your project, you can also book a free strategy call.</p>
        <div className="contact-info-card"><span>01 / EMAIL</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
        <div className="contact-info-card"><span>02 / ADDRESS</span><p>Business address available on request.</p></div>
        <div className="contact-info-card"><span>03 / PHONE</span><p>Request a phone conversation by email or book a call below.</p></div>
        <div className="contact-info-card"><span>04 / SOCIAL</span><div className="contact-socials"><a href="https://www.instagram.com/hinovadesign/" target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram <Arrow /></a><a href="https://www.linkedin.com/company/hinova-design" target="_blank" rel="noopener noreferrer"><LinkedInIcon /> LinkedIn <Arrow /></a></div></div>
        <a className="button button-acid contact-call" href={strategyCallUrl}>Book a Free Strategy Call <Arrow /></a>
      </aside>
    </div></section>
  </InnerPageShell>;
}
