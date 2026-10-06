import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InnerPageShell } from "@/components/InnerPageShell";
import { PageHeroGraphic } from "@/components/PageHeroGraphic";
import { Arrow } from "@/components/Icons";
import { blogPosts } from "@/content/blog-content";
export const metadata: Metadata = { title: "Insights", description: "Ideas and practical perspectives on course planning, learning design and thoughtful resources from Hinova Design.", alternates: { canonical: "/insights/" } };
export default function InsightsPage() {
  const [featured, ...posts] = blogPosts;
  return <InnerPageShell scope="insights">
    <section className="inner-hero"><div className="container inner-hero-grid"><div><p className="eyebrow">Ideas / Learning / Design</p><h1>A little insight.<br /><em>A clearer next step.</em></h1><p className="inner-lead">Notes, ideas and practical guidance to help you turn what you know into learning that makes a difference.</p><a className="button button-acid insights-hero-link" href="#latest">Explore the insights <Arrow /></a></div><PageHeroGraphic topic="insights" /></div></section>
    <section className="section insights-section" id="latest"><div className="container">
      <div className="insights-section-heading"><p className="eyebrow">The latest thinking</p><h2>Made for curious minds.</h2></div>
      <Link href={`/insights/${featured.id}/`} className="insights-feature" data-reveal><div className="insights-feature-image"><Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 760px) 90vw, 50vw" /></div><div className="insights-feature-copy"><span className="eyebrow">Featured / {featured.category}</span><h2>{featured.title}</h2><p>{featured.introduction}</p><span className="insights-read">Read the article <Arrow /></span></div></Link>
      <div className="insights-grid">{posts.map(post => <article className="insights-card" key={post.id} data-reveal><Link href={`/insights/${post.id}/`}><div className="insights-card-image"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw" /></div><div className="insights-card-copy"><p className="eyebrow">{post.category}</p><h3>{post.title}</h3><p>{post.introduction}</p><span className="insights-read">Read article <Arrow /></span></div></Link></article>)}</div>
      <div className="insights-cta"><div><p className="eyebrow">Put your ideas into practice</p><h2>What are you working on?</h2><p>Let’s find the next step for your course or resource.</p></div><Link className="button button-dark" href="/contact/">Talk to Hinova <Arrow /></Link></div>
    </div></section>
  </InnerPageShell>;
}
