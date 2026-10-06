import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { policies } from "@/content/policies";
export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms-of-service/" } };
export default function Page() { return <PolicyPage policy={policies["terms-of-service"]} slug="terms-of-service" />; }
