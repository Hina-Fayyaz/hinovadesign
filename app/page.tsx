import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { Arrow } from "@/components/Icons";
export default function HomePage() {
  return (
    <div className="gateway">
      <header className="gateway-header container">
        <Logo light />
        <span>Courses · Platforms · Learning resources</span>
      </header>
      <main id="main-content" className="gateway-main container">
        <div className="gateway-heading">
          <p className="eyebrow">Learning designed around people</p>
          <h1>
            What would you like to
            <br />
            <span>create with Hinova?</span>
          </h1>
          <p>
            Course planning, online course development, platform setup and
            resource design for coaches and educators.
          </p>
        </div>
        <div className="gateway-choices">
          <Link className="choice choice-coaches" href="/coaches/">
            <div className="choice-body">
              <span className="eyebrow">01 / Coaches</span>
              <h2>I am a Coach</h2>
              <p>
                Build a course and resources that help clients put your coaching
                into practice.
              </p>
              <span className="choice-link">
                Explore coaching services <Arrow />
              </span>
            </div>
            <div className="choice-photo">
              <Image
                src="/images/agency/coaching-workspace.webp"
                alt="A woman working at her laptop beside a window"
                fill
                sizes="(max-width:700px) 33vw, 20vw"
                priority
              />
            </div>
          </Link>
          <Link className="choice choice-educators" href="/educators/">
            <div className="choice-body">
              <span className="eyebrow">02 / Educators</span>
              <h2>I am an Educator</h2>
              <p>
                Develop courses and materials that support teaching and learner
                practice.
              </p>
              <span className="choice-link">
                Explore education services <Arrow />
              </span>
            </div>
            <div className="choice-photo">
              <Image
                src="/images/agency/collaborative-workspace.webp"
                alt="Colleagues working together on laptops"
                fill
                sizes="(max-width:700px) 33vw, 20vw"
                priority
              />
            </div>
          </Link>
        </div>
      </main>
      <footer className="gateway-footer container">
        <p>© {new Date().getUTCFullYear()} Hinova Design</p>
        <nav className="gateway-legal" aria-label="Contact and legal links">
          <Link href="/insights/">Insights</Link>
          <Link href="/contact/">Contact Us</Link>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/refund-and-cancellation/">Refund and Cancellation</Link>
          <Link href="/terms-of-service/">Terms of Service</Link>
        </nav>
      </footer>
    </div>
  );
}
