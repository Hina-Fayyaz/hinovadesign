import Link from "next/link";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { Arrow } from "./Icons";
import { MotionEffects } from "./MotionEffects";
import { strategyCallUrl } from "@/content";

export function InnerPageShell({ children, scope }: { children: React.ReactNode; scope: string }) {
  return <div className="inner-page">
    <MotionEffects scope={scope} />
    <header className="inner-header"><div className="container inner-header-row">
      <Logo />
      <nav aria-label="Site navigation"><Link href="/coaches/">Coaches</Link><Link href="/educators/">Educators</Link><Link href="/insights/">Insights</Link><Link href="/contact/">Contact Us</Link></nav>
      <a className="button button-dark inner-header-cta" href={strategyCallUrl}>Book a Free Strategy Call <Arrow /></a>
    </div></header>
    <main id="main-content">{children}</main>
    <Footer audience="educators" showCta={false} />
  </div>;
}
