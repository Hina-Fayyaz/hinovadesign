import Image from "next/image";
import Link from "next/link";
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Hinova Design home">
      <Image
        src={`/brand/logo-${light ? "light" : "dark"}.svg`}
        alt="Hinova Design"
        width={220}
        height={62}
        priority
      />
    </Link>
  );
}
