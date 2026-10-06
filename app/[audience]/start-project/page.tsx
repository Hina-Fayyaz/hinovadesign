import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/InquiryForm";
import { audiences, isAudience, contactEmail } from "@/content";
export const dynamicParams = false;
export const metadata: Metadata = {
  title: "Start a Project or Request a Strategy Call",
  robots: { index: false, follow: true },
};
export function generateStaticParams() {
  return audiences.map((audience) => ({ audience }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!isAudience(audience)) notFound();
  return (
    <Suspense
      fallback={
        <main id="main-content" className="not-found">
          <h1>Tell us about your project.</h1>
          <p>Preparing your inquiry form…</p>
          <p>
            You can also email{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
          <Link href={`/${audience}/`}>Back to Hinova</Link>
        </main>
      }
    >
      <InquiryForm audience={audience} />
    </Suspense>
  );
}
