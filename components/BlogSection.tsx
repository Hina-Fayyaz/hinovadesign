"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { blogPosts, type BlogPost } from "@/content/blog-content";
import { Arrow } from "./Icons";

export function BlogSection() {
  const [article, setArticle] = useState<BlogPost | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!article || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    element.scrollTop = 0;
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [article]);

  return (
    <section className="section blog-section" id="blog" aria-labelledby="blog-heading">
      <div className="container">
        <div className="blog-heading" data-reveal>
          <div>
            <h2 id="blog-heading">Ideas for better learning.</h2>
            <p className="lead">Notes on courses, creativity and thoughtful learning design.</p>
          </div>
          <Link className="button button-dark blog-more" href="/insights/">All Insights <Arrow /></Link>
        </div>
        <div className="blog-grid">
          {blogPosts.slice(0, 3).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} onOpen={(button) => { trigger.current = button; setArticle(post); }} />
          ))}
        </div>

      </div>
      <dialog ref={dialog} className="article-dialog" aria-labelledby="article-title" onCancel={() => setArticle(null)} onClose={() => setArticle(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setArticle(null);
      }}>
        {article && (
          <>
            <div className="article-toolbar">
              <span>Hinova / Insights</span>
              <button className="article-close" type="button" aria-label="Close article" onClick={() => setArticle(null)} autoFocus>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <article className="article-content">
              <p className="eyebrow">{article.category}</p>
              <h2 id="article-title">{article.title}</h2>
              <p className="article-intro">{article.introduction}</p>
              <Image className="article-image" src={article.image} alt={article.imageAlt} width={800} height={500} sizes="(max-width:700px) 90vw, 720px" />
              {article.sections.map((section) => (
                <section key={section.heading} className="article-section">
                  <h3>{section.heading}</h3>
                  <p>{section.text}</p>
                </section>
              ))}
              <aside className="article-takeaway"><span className="eyebrow">One thing to try</span><p>{article.takeaway}</p></aside>
              <button className="article-back" type="button" onClick={() => setArticle(null)}>Back to the blog <Arrow /></button>
            </article>
          </>
        )}
      </dialog>
    </section>
  );
}

function BlogCard({ post, index, onOpen }: { post: BlogPost; index: number; onOpen: (button: HTMLButtonElement) => void }) {
  return (
    <article className={`blog-card blog-card-${index}`} data-reveal data-reveal-delay={index * 90}>
      <p className="blog-category">{post.category}</p>
      <h3><button className="blog-card-button" type="button" onClick={(event) => onOpen(event.currentTarget)} aria-haspopup="dialog">{post.title}</button></h3>
      <div className="blog-image-frame">
        <div className="blog-image"><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width:700px) 85vw, (max-width:1000px) 43vw, 28vw" /></div>
        <span className="blog-open" aria-hidden="true"><Arrow /></span>
      </div>
      <span className="blog-read" aria-hidden="true">Read article <Arrow /></span>
    </article>
  );
}
