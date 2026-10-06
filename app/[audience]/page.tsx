import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudiencePage } from "@/components/AudiencePage";
import { audiences, isAudience, siteContent } from "@/content";
export const dynamicParams = false;
export function generateStaticParams() {
  return audiences.map((audience) => ({ audience }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  if (!isAudience(audience)) return {};
  const c = siteContent[audience];
  return {
    title: { absolute: c.title },
    description: c.heroParagraphs[0],
    alternates: { canonical: `/${audience}/` },
    openGraph: {
      title: c.title,
      description: c.heroParagraphs[0],
      url: `/${audience}/`,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!isAudience(audience)) notFound();
  return <AudiencePage audience={audience} />;
}
