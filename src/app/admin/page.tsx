import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  let media = 0;
  let services = 0;
  let designs = 0;
  let slides = 0;
  let websites = 0;
  let dbError = "";

  try {
    [media, services, designs, slides, websites] = await Promise.all([
      prisma.media.count(),
      prisma.service.count(),
      prisma.design.count(),
      prisma.campaignSlide.count(),
      prisma.webSite.count(),
    ]);
  } catch (err) {
    console.error("[admin dashboard]", err);
    dbError =
      err instanceof Error
        ? err.message
        : "Database connection failed. Check DATABASE_URL on Hostinger.";
  }

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
        for Creative Work and the campaign slider.
      </p>

      {dbError && (
        <div
          className="admin-card"
          style={{
            borderColor: "rgba(255, 18, 40, 0.45)",
            marginBottom: 18,
          }}
        >
          <h3 style={{ marginTop: 0, color: "#ff6b7a" }}>
            Database not connected
          </h3>
          <p style={{ margin: "0 0 10px", color: "rgba(243,245,249,0.75)" }}>
            Login works, but MySQL is unreachable. Fix{" "}
            <code>DATABASE_URL</code> in Hostinger → Environment variables,
            then run schema setup:
          </p>
          <pre
            style={{
              margin: "0 0 10px",
              padding: 12,
              background: "#0b1224",
              borderRadius: 8,
              overflow: "auto",
              fontSize: 13,
            }}
          >{`npx prisma db push
npx tsx prisma/seed.ts`}</pre>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "rgba(243,245,249,0.45)",
              wordBreak: "break-word",
            }}
          >
            {dbError}
          </p>
        </div>
      )}

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
