import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { policies } from "@/content/policies";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy/" } };
export default function Page() { return <PolicyPage policy={policies["privacy-policy"]} slug="privacy-policy" />; }
