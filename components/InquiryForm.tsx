"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { submitInquiry } from "@/public/forms/submit.mjs";
import { useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { Arrow } from "./Icons";
import { contactEmail, type Audience } from "@/content";
import {
  inquiryConfig,
  type Field,
  type Step,
} from "@/content/inquiry-content";
type Values = Record<string, string | string[]>;
export function InquiryForm({ audience }: { audience: Audience }) {
  const params = useSearchParams();
  const isCall = params.get("type") === "strategy-call";
  const config = inquiryConfig[audience];
  const callStep: Step = {
    label: "Your call",
    title: "What would you like to discuss?",
    intro: "A few details are enough. Fields marked * are required.",
    kind: "fields",
    fields: [
      { name: "full_name", label: "Your name", type: "text", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      {
        name: "role_organisation",
        label:
          audience === "coaches"
            ? "Business or coaching focus"
            : "Your role and organisation",
        type: "text",
        full: true,
      },
      {
        name: "project",
        label:
          audience === "coaches"
            ? "What course or resource are you creating?"
            : "What education project are you working on?",
        type: "textarea",
        placeholder: "Tell us who it is for and what you have in mind.",
        required: true,
        full: true,
      },
      {
        name: "availability",
        label: "Your time zone and preferred availability",
        type: "text",
        placeholder: "For example: London time, weekday mornings",
        required: true,
        full: true,
      },
    ],
  };
  const steps: Step[] = isCall
    ? [
        callStep,
        {
          ...config.steps[0],
          label: "Support & review",
          title: "Where would you like support?",
          intro:
            "Select the areas you would like to discuss, then review your details.",
          review: true,
        },
      ]
    : config.steps;
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const step = steps[current];
  useEffect(() => {
    if (moved.current) title.current?.focus();
    else moved.current = true;
  }, [current, submitted]);
  function setValue(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setError("");
  }
  function toggle(name: string, value: string) {
    setValues((v) => {
      const old = Array.isArray(v[name]) ? (v[name] as string[]) : [];
      return {
        ...v,
        [name]: old.includes(value)
          ? old.filter((x) => x !== value)
          : [...old, value],
      };
    });
    setError("");
  }
  const labels: Record<string, string> = { services: "Requested support" };
  steps.forEach((s) =>
    s.fields?.forEach((f) => {
      labels[f.name] = f.label;
    }),
  );
  const entries = Object.entries(values).filter(([, v]) =>
    Array.isArray(v) ? v.length : v.trim(),
  );
  async function next(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setError("");
    if (
      step.kind === "options" &&
      (!Array.isArray(values.services) || !values.services.length)
    ) {
      setError("Please select at least one area of support.");
      form.current
        ?.querySelector<HTMLInputElement>("input[type=checkbox]")
        ?.focus();
      return;
    }
    if (!form.current?.reportValidity()) return;
    if (current === steps.length - 1) {
      setPending(true);
      try {
        await submitInquiry({ type: isCall ? "strategy-call" : "project", audience, data: values });
        setSubmitted(true);
      } catch (error) { setError(error instanceof Error ? error.message : "Please try again."); }
      finally { setPending(false); }
    } else setCurrent(current + 1);
  }
  function back() {
    setError("");
    setCurrent(Math.max(0, current - 1));
  }
  function renderField(field: Field) {
    const val = values[field.name] || "";
    const label = `${field.label}${field.required ? " *" : ""}`;
    const id = `field-${field.name}`;
    if (field.type === "checks")
      return (
        <fieldset
          className={`field ${field.full ? "full" : ""}`}
          key={field.name}
        >
          <legend>{label}</legend>
          <div className="inline-options">
            {field.options?.map((option) => (
              <label className="inline-choice" key={option}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={Array.isArray(val) && val.includes(option)}
                  onChange={() => toggle(field.name, option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      );
    const shared = {
      id,
      name: field.name,
      required: field.required,
      value: typeof val === "string" ? val : "",
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
      ) => setValue(field.name, e.target.value),
    };
    return (
      <div className={`field ${field.full ? "full" : ""}`} key={field.name}>
        <label htmlFor={id}>{label}</label>
        {field.type === "textarea" ? (
          <textarea
            {...shared}
            placeholder={field.placeholder}
            maxLength={6000}
          />
        ) : field.type === "select" ? (
          <select {...shared}>
            {field.options?.map((option) => (
              <option value={option} disabled={!option} key={option}>
                {option || "Choose an option"}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...shared}
            type={field.type}
            placeholder={field.placeholder}
            maxLength={field.type === "email" ? 254 : 1000}
            autoComplete={
              field.name === "email"
                ? "email"
                : field.name === "first_name"
                  ? "given-name"
                  : field.name === "last_name"
                    ? "family-name"
                    : field.name === "full_name"
                      ? "name"
                      : field.name === "organisation"
                        ? "organization"
                        : undefined
            }
          />
        )}
      </div>
    );
  }
  return (
    <div className={`inquiry-page ${audience}`}>
      <aside className="inquiry-aside">
        <Logo light />
        <div className="inquiry-aside-body">
          <p className="eyebrow">
            {isCall ? "Free 45-minute strategy call" : config.audienceLabel}
          </p>
          <h1>
            {isCall
              ? audience === "coaches"
                ? "Let’s talk through your course."
                : "Let’s talk through your education project."
              : config.asideTitle}
          </h1>
          <p>
            {isCall
              ? "Share a few details so we can prepare for the conversation and contact you to arrange a suitable time."
              : config.asideText}
          </p>
        </div>
        <Link className="aside-back" href={config.backHref}>
          ← {config.backLabel}
        </Link>
      </aside>
      <main id="main-content" className="inquiry-main">
        <p className="inquiry-intro">
          Share your project details below. We’ll use them to respond to your inquiry.
          {" "}<Link href="/privacy-policy/">Privacy Policy</Link>
        </p>
        {submitted ? (
          <section className="submission-success" role="status">
            <p className="eyebrow">Thank you for getting in touch</p>
            <h2 tabIndex={-1} ref={title}>Your request has been received.</h2>
            <p>We’ll review your details and reply by email. For anything else, contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
            <Link className="button button-dark" href={config.backHref}>Back to Hinova <Arrow /></Link>
          </section>
        ) : (
          <>
            <div className="form-progress-meta">
              <span>
                Step {current + 1} of {steps.length}
              </span>
              <span>{step.label}</span>
            </div>
            <div
              className="form-progress-track"
              role="progressbar"
              aria-label="Inquiry progress"
              aria-valuemin={0}
              aria-valuemax={steps.length}
              aria-valuenow={current + 1}
            >
              <span
                style={{ width: `${((current + 1) / steps.length) * 100}%` }}
              />
            </div>
            <form ref={form} onSubmit={next} aria-busy={pending}>
              <h2 tabIndex={-1} ref={title}>
                {step.title}
              </h2>
              <p className="step-intro">{step.intro}</p>
              {step.kind === "options" ? (
                <fieldset
                  className="field"
                  aria-describedby={error ? "support-error" : undefined}
                >
                  <legend className="sr-only">
                    Select the support you need
                  </legend>
                  <div className="inquiry-options">
                    {step.options?.map(([name, description]) => (
                      <label className="option-card" key={name}>
                        <input
                          type="checkbox"
                          name="services"
                          value={name}
                          checked={
                            Array.isArray(values.services) &&
                            values.services.includes(name)
                          }
                          onChange={() => toggle("services", name)}
                        />
                        <strong>{name}</strong>
                        <small>{description}</small>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <div className="fields">{step.fields?.map(renderField)}</div>
              )}
              {step.review && entries.length > 0 && (
                <div className="form-review">
                  <h3>Your inquiry at a glance</h3>
                  <dl>
                    {entries.map(([key, value]) => (
                      <div className="review-row" key={key}>
                        <dt>{labels[key] || key}</dt>
                        <dd>
                          {Array.isArray(value) ? value.join(", ") : value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {error && (
                <p className="form-error" id="support-error" role="alert">
                  {error}
                </p>
              )}
              <div className="form-actions">
                {current > 0 ? (
                  <button className="back-button" type="button" onClick={back} disabled={pending}>
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button className="button button-dark" type="submit" disabled={pending}>
                  {pending ? "Sending…" : current === steps.length - 1
                    ? isCall
                      ? "Send Call Request"
                      : config.submitLabel
                    : "Continue"}
                  <Arrow />
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
