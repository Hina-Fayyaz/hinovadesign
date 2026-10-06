"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Arrow } from "./Icons";
export function Header({ audience }: { audience: "coaches" | "educators" }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const base = `/${audience}/`;
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span
            className={`menu-lines ${open ? "is-open" : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          onClick={() => setOpen(false)}
        >
          <div className="audience-nav">
            <Link
              href="/coaches/"
              aria-current={audience === "coaches" ? "page" : undefined}
            >
              For Coaches
            </Link>
            <Link
              href="/educators/"
              aria-current={audience === "educators" ? "page" : undefined}
            >
              For Educators
            </Link>
          </div>
          <a href={`${base}#services`}>Services</a>
          <a href={`${base}#process`}>How We Work</a>
          <a href={`${base}#team`}>Our Team</a>
          <Link href="/insights/">Insights</Link>
          <a
            className="button button-dark nav-cta"
            href={`${base}#strategy-call`}
          >
            Let’s talk <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
