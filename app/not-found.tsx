import Link from "next/link";
import { Logo } from "@/components/Logo";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <Logo />
      <p className="eyebrow">404</p>
      <h1>
        Let’s get you
        <br />
        to the right place.
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link className="button button-dark" href="/">
        Back to Hinova
      </Link>
    </main>
  );
}
