"use client";

import { useEffect } from "react";

// Progressive enhancement: all content remains visible without JavaScript.
export function MotionEffects({ scope }: { scope: string }) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.removeAttribute("data-reveal-pending");
        if (!preference.matches) {
          const animation = element.animate([
            { opacity: 0, translate: "0 24px" },
            { opacity: 1, translate: "0 0" },
          ], { duration: 650, easing: "cubic-bezier(.2,.7,.25,1)", delay: Number(element.dataset.revealDelay || 0), fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(element);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight || element.closest("[hidden]")) return;
      element.setAttribute("data-reveal-pending", "");
      observer.observe(element);
    });
    function revealFocused(event: FocusEvent) {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal-pending]");
      if (element) { element.removeAttribute("data-reveal-pending"); observer.unobserve(element); }
    }
    function stopMotion() {
      if (!preference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-reveal-pending"));
      animations.forEach((animation) => animation.finish());
    }
    document.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      elements.forEach((element) => element.removeAttribute("data-reveal-pending"));
      document.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", stopMotion);
    };
  }, [scope]);
  return null;
}
