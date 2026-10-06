import Link from "next/link";
import { Logo } from "./Logo";
import { Arrow, InstagramIcon, LinkedInIcon } from "./Icons";
import { contactEmail, siteContent, type Audience } from "@/content";
export function Footer({ audience, showCta = true }: { audience: Audience; showCta?: boolean }) {
  const alternative = siteContent[audience].strategy;
  return (
    <footer className="site-footer">
      {showCta && <div className="footer-cta-wrap">
        <div className="container footer-cta" data-reveal>
          <div>
            <p className="eyebrow">Let’s make it happen</p>
            <h2>Have a defined project in mind?</h2>
            <p>{alternative.alternativeDescription}</p>
          </div>
          <Link className="button button-dark" href={`/${audience}/start-project/`}>
            Start a Project <Arrow />
          </Link>
        </div>
      </div>}
      <div className="container footer-content">
        <div className="footer-brand-row">
          <div>
            <Logo light />
            <p>Learning design for coaches and educators.</p>
          </div>
          <div className="footer-socials" aria-label="Hinova social profiles">
            <a href="https://www.instagram.com/hinovadesign/" aria-label="Hinova on Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            <a href="https://www.linkedin.com/company/hinova-design" aria-label="Hinova on LinkedIn" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
          </div>
        </div>
        <div className="footer-columns">
          <div>
            <h3>Get in touch</h3>
            <p>Tell us about the course or resource you would like to create.</p>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <nav aria-label="Footer navigation">
            <h3>Explore</h3>
            <Link href="/coaches/">For Coaches</Link>
            <Link href="/educators/">For Educators</Link>
            <Link href={`/${audience}/#team`}>Our Team</Link>
            <Link href={`/${audience}/#founder`}>Founder</Link>
            <Link href="/insights/">Insights</Link>
          </nav>
          <div>
            <h3>Our services</h3>
            <ul>
              <li>Course planning</li>
              <li>Course development</li>
              <li>Platform setup</li>
              <li>Resource design</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getUTCFullYear()} Hinova Design</span>
          <nav className="footer-legal" aria-label="Legal and contact links">
            <Link href="/contact/">Contact Hinova</Link>
            <Link href="/privacy-policy/">Privacy Policy</Link>
            <Link href="/refund-and-cancellation/">Refund and Cancellation</Link>
            <Link href="/terms-of-service/">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
