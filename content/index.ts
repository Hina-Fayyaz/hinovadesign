import data from "./site-content.json";
export type Audience = "coaches" | "educators";
export const audiences: Audience[] = ["coaches", "educators"];
export const siteContent = data;
export type AudienceContent = typeof data.educators;
export type Service = AudienceContent["services"][number];
export const contactEmail = "contact@hinovadesign.com";
export const strategyCallUrl =
  "https://calendly.com/hinovadesign/45-minute-meeting";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hinovadesign.com";
export const isAudience = (value: string): value is Audience =>
  audiences.includes(value as Audience);
