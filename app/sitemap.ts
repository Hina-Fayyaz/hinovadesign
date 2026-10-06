import type { MetadataRoute } from "next";
import { siteUrl } from "@/content";
import { blogPosts } from "@/content/blog-content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/coaches/", "/educators/", "/hinafayyaz/", "/contact/", "/privacy-policy/", "/refund-and-cancellation/", "/terms-of-service/", "/insights/", ...blogPosts.map(post => `/insights/${post.id}/`)].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.9 : 1,
  }));
}
