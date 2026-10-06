import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";
import { policies } from "@/content/policies";
export const metadata: Metadata = { title: "Refund and Cancellation", alternates: { canonical: "/refund-and-cancellation/" } };
export default function Page() { return <PolicyPage policy={policies["refund-and-cancellation"]} slug="refund-and-cancellation" />; }
