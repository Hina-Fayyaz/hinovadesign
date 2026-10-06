import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPageShell } from "@/components/InnerPageShell";
import { blogPosts } from "@/content/blog-content";
export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(post => ({ slug: post.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(post => post.id === slug);
  return post ? { title: post.title, description: post.introduction, alternates: { canonical: `/insights/${post.id}/` } } : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(post => post.id === slug);
  if (!post) notFound();
  return <InnerPageShell scope={slug}><article>
    <header className="article-header"><div className="container"><Link className="article-back" href="/insights/">← All insights</Link><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p>{post.introduction}</p></div></header>
    <div className="container article-cover"><Image src={post.image} alt={post.imageAlt} width={1400} height={700} sizes="90vw" priority /></div>
    <div className="article-body">{post.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<aside className="article-takeaway"><p className="eyebrow">One thing to take away</p><p>{post.takeaway}</p></aside><Link className="button button-dark" href="/insights/">Explore more insights ↗</Link></div>
  </article></InnerPageShell>;
}
