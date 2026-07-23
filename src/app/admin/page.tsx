import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [media, services, designs, slides, websites] = await Promise.all([
    prisma.media.count(),
    prisma.service.count(),
    prisma.design.count(),
    prisma.campaignSlide.count(),
    prisma.webSite.count(),
  ]);

  const cards = [
    { href: "/admin/gallery", label: "Gallery images", value: media },
    { href: "/admin/services", label: "Service cards", value: services },
    { href: "/admin/creative-work", label: "Creative works", value: designs },
    { href: "/admin/campaign", label: "Campaign slides", value: slides },
    { href: "/admin/web", label: "Web projects", value: websites },
  ];

  return (
    <>
      <h1>Dashboard</h1>
      <p className="lead">
        Manage site content. Upload images once in the gallery, then pick them
        for Creative Work and the campaign slider. The full designs page loads
        every gallery-linked design.
      </p>
      <div className="admin-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="admin-card">
            <div style={{ fontSize: 32, fontWeight: 700 }}>{c.value}</div>
            <div style={{ color: "rgba(255,255,255,0.55)" }}>{c.label}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
