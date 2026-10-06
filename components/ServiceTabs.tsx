"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Service } from "@/content";
import { Check, ServiceIcon } from "./Icons";
const labels = [
  "Course planning",
  "Course development",
  "Platform setup",
  "Resource design",
];
export function ServiceTabs({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % 4;
    else if (e.key === "ArrowLeft") next = (index + 3) % 4;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 3;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="services-tabs">
      <div
        role="tablist"
        aria-label="Explore Hinova services"
        className="tab-list"
      >
        {labels.map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            id={`service-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`service-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="tab-number">0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
      {services.map((service, i) => (
        <div
          key={service.title}
          id={`service-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${i}`}
          tabIndex={0}
          hidden={active !== i}
          className={`service-panel service-panel-${i}`}
        >
          <div className="service-description">
            <span className="eyebrow">{service.index}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="service-fit">
              <span>Useful when</span>
              <p>{service.fit}</p>
            </div>
          </div>
          <div className="service-deliverables">
            <ServiceIcon kind={i} className="service-icon" />
            <ul>
              {service.details.map((item) => (
                <li key={item}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="service-outcome">
              <span>You receive</span>
              <p>{service.outcome}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
