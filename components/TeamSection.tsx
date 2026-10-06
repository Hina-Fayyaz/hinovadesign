"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";
import { teamMembers } from "@/content/team";

export function TeamSection() {
  const track = useRef<HTMLUListElement>(null);
  const [canMoveBack, setCanMoveBack] = useState(false);
  const [canMoveNext, setCanMoveNext] = useState(true);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      setCanMoveBack(element.scrollLeft > 2);
      setCanMoveNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 2);
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    const cards = element.querySelectorAll<HTMLElement>(".team-profile");
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : element.clientWidth;
    element.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="section team-section team-showcase" id="team" aria-labelledby="team-heading">
      <div className="container">
        <div className="team-heading-block" data-reveal>
          <h2 id="team-heading">Our Creative Team</h2>
          <p>Different skills, working together to make learning feel clear and useful.</p>
        </div>
        <div className="team-carousel-layout">
          <button className="team-arrow team-arrow-prev" type="button" onClick={() => move(-1)} disabled={!canMoveBack} aria-label="Previous team member"><Arrow /></button>
          <ul className="team-card-grid" ref={track} aria-label="Hinova team members and open roles">
            {teamMembers.map((member, index) => (
              <li className={`team-profile team-profile-${index + 1}`} key={member.name ?? member.role}>
                <div className="team-profile-visual">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name || member.role} fill sizes="(max-width:700px) 75vw, (max-width:1100px) 42vw, 26vw" />
                  ) : (
                    <div className="team-profile-placeholder" aria-label={member.name ? `Photo of ${member.name} coming soon` : "Photo coming soon"}>
                      <span aria-hidden="true">{member.initials}</span>
                      <small>Photo coming soon</small>
                    </div>
                  )}
                </div>
                <div className="team-profile-caption">
                  <h3>{member.name || "Your name here"}</h3>
                  <p>{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
          <button className="team-arrow team-arrow-next" type="button" onClick={() => move(1)} disabled={!canMoveNext} aria-label="Next team member"><Arrow /></button>
        </div>
      </div>
    </section>
  );
}
