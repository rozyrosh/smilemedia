import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

const KEYS = [
  "heroEyebrow",
  "heroHeadline1",
  "heroHeadline2",
  "heroSub",
  "portfolioEyebrow",
  "portfolioTitle",
  "portfolioSub",
] as const;

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const patch: Record<string, string> = {};
  for (const key of KEYS) {
    if (body[key] !== undefined) patch[key] = String(body[key] ?? "");
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      heroEyebrow: patch.heroEyebrow || "",
      heroHeadline1: patch.heroHeadline1 || "",
      heroHeadline2: patch.heroHeadline2 || "",
      heroSub: patch.heroSub || "",
      portfolioEyebrow: patch.portfolioEyebrow || "Creative Work",
      portfolioTitle: patch.portfolioTitle || "OUR ARTISTRY",
      portfolioSub: patch.portfolioSub || "",
    },
    update: patch,
  });
  return NextResponse.json(settings);
}
