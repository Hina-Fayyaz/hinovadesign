import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/content";
import "./globals.css";
import "./styles/team-founder.css";
import "./styles/inner-pages.css";
const cal = localFont({
  src: "./fonts/cal-sans-400.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});
const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400" },
    { path: "./fonts/inter-500.woff2", weight: "500" },
    { path: "./fonts/inter-600.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hinova Design | Learning Design for Coaches & Educators",
    template: "%s | Hinova Design",
  },
  description:
    "Course planning, online course development, platform setup and resource design for coaches and educators.",
  icons: { icon: "/brand/favicon.svg" },
  openGraph: { siteName: "Hinova Design", locale: "en_US", type: "website" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cal.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
