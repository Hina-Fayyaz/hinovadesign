import type { SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement>;
export function InstagramIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="2.5" y="2.5" width="19" height="19" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.4" r="1" fill="currentColor" stroke="none" /></svg>;
}
export function LinkedInIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M5.2 8.4H2.4V21h2.8V8.4ZM3.8 2.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM9 8.4H6.3V21H9v-6.7c0-1.8.8-3 2.5-3 1.6 0 2.2 1.1 2.2 3V21h2.8v-7.1c0-3.6-1.9-5.7-4.7-5.7-1.5 0-2.5.6-3 1.4V8.4Z" transform="translate(2.1 0) scale(1.08 1)" /></svg>;
}
export function Arrow(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}
export function Check(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
export function Clock(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
export function Video(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="5" width="14" height="14" rx="3" />
      <path d="m16 9 6-3v12l-6-3" />
    </svg>
  );
}
export function ServiceIcon({ kind, ...props }: IconProps & { kind: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      {...props}
    >
      {kind === 0 ? (
        <>
          <rect x="5" y="5" width="15" height="12" rx="2" />
          <rect x="28" y="30" width="15" height="12" rx="2" />
          <path d="M12 17v19h16M20 11h15v19M8 27h8" />
        </>
      ) : kind === 1 ? (
        <>
          <rect x="5" y="7" width="38" height="30" rx="3" />
          <path d="M5 15h38m-23 8 10 5-10 5zm-5 18h18" />
        </>
      ) : kind === 2 ? (
        <>
          <rect x="5" y="6" width="38" height="29" rx="3" />
          <path d="M16 42h16m-8-7v7M12 14h9m-9 7h16m-16 7h22" />
          <path d="m30 14 3 3 5-6" />
        </>
      ) : (
        <>
          <path d="M12 5h20l7 7v31H12zM31 5v9h8M19 22h13M19 29h13M19 36h7M7 10v28" />
        </>
      )}
    </svg>
  );
}
