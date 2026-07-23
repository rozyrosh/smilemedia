"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Media Gallery" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/services", label: "Our Services" },
  { href: "/admin/campaign", label: "Campaign Slider" },
  { href: "/admin/creative-work", label: "Creative Work" },
  { href: "/admin/web", label: "Web Development" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") return null;

  return (
    <aside className="admin-side">
      <div className="admin-brand">SMILE ADMIN</div>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={pathname === l.href ? "active" : undefined}
        >
          {l.label}
        </Link>
      ))}
      <button
        type="button"
        className="admin-btn secondary"
        style={{ marginTop: "auto" }}
        onClick={logout}
      >
        Logout
      </button>
      <Link href="/">← View site</Link>
    </aside>
  );
}
