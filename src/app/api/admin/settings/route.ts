import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      heroEyebrow: body.heroEyebrow || "",
      heroHeadline1: body.heroHeadline1 || "",
      heroHeadline2: body.heroHeadline2 || "",
      heroSub: body.heroSub || "",
      portfolioEyebrow: body.portfolioEyebrow || "Creative Work",
      portfolioTitle: body.portfolioTitle || "OUR ARTISTRY",
      portfolioSub: body.portfolioSub || "",
    },
    update: {
      heroEyebrow: body.heroEyebrow,
      heroHeadline1: body.heroHeadline1,
      heroHeadline2: body.heroHeadline2,
      heroSub: body.heroSub,
      portfolioEyebrow: body.portfolioEyebrow,
      portfolioTitle: body.portfolioTitle,
      portfolioSub: body.portfolioSub,
    },
  });
  return NextResponse.json(settings);
}
