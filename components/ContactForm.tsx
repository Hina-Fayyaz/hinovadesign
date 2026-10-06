"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "./Icons";
import { submitInquiry } from "@/public/forms/submit.mjs";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setPending(true); setStatus(""); setError("");
    try {
      const data = Object.fromEntries(new FormData(form));
      await submitInquiry({ type: "contact", data });
      setStatus("Thank you. Your message has been received. We’ll be in touch by email.");
      form.reset();
    } catch (error) { setError(error instanceof Error ? error.message : "Please try again."); }
    finally { setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={pending}>
    <div className="contact-form-heading"><span className="eyebrow">Send a note</span><h2>Tell us what you’re working on.</h2><p>Share a little about your course, resource or project. We’ll take it from there.</p></div>
    <div className="contact-fields">
      <label>Your name <span aria-hidden="true">*</span><input name="name" type="text" autoComplete="name" required maxLength={150} placeholder="Your name" /></label>
      <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      <label className="contact-full">What is this about?<select name="subject" defaultValue="General inquiry"><option>General inquiry</option><option>Course or learning resource</option><option>Document design</option><option>Collaboration</option></select></label>
      <label className="contact-full">Your message <span aria-hidden="true">*</span><textarea name="message" required minLength={10} maxLength={6000} rows={6} placeholder="Tell us what you have in mind, who it’s for and your timing if you know it." /></label>
    </div>
    <p className="contact-form-note">We’ll use these details to respond to your inquiry. Read our <Link href="/privacy-policy/">Privacy Policy</Link>.</p>
    <button className="button button-dark" type="submit" disabled={pending}>{pending ? "Sending…" : "Send Message"} <Arrow /></button>
    {error && <p className="form-error" role="alert">{error}</p>}
    {status && <p className="form-success" role="status">{status}</p>}
  </form>;
}
