import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const rows = await prisma.design.findMany({
    orderBy: { sortOrder: "asc" },
    include: { media: true },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const count = await prisma.design.count();

  let imageUrl = body.imageUrl || "";
  if (body.mediaId) {
    const media = await prisma.media.findUnique({ where: { id: body.mediaId } });
    if (media) imageUrl = media.url;
  }

  const row = await prisma.design.create({
    data: {
      title: body.title || "Untitled",
      category: body.category || "Digital",
      imageUrl,
      mediaId: body.mediaId || null,
      showInPortfolio: body.showInPortfolio ?? true,
      sortOrder: body.sortOrder ?? count,
    },
  });
  return NextResponse.json(row, { status: 201 });
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  let imageUrl = body.imageUrl;
  if (body.mediaId) {
    const media = await prisma.media.findUnique({ where: { id: body.mediaId } });
    if (media) imageUrl = media.url;
  }
  const row = await prisma.design.update({
    where: { id: body.id },
    data: {
      title: body.title,
      category: body.category,
      imageUrl,
      mediaId: body.mediaId ?? null,
      showInPortfolio: body.showInPortfolio,
      sortOrder: body.sortOrder,
    },
  });
  return NextResponse.json(row);
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.design.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
