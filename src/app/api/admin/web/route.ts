import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const rows = await prisma.webSite.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const count = await prisma.webSite.count();
  let imageUrl = body.imageUrl || "";
  if (body.mediaId) {
    const media = await prisma.media.findUnique({ where: { id: body.mediaId } });
    if (media) imageUrl = media.url;
  }
  const row = await prisma.webSite.create({
    data: {
      num: body.num || String(count + 1).padStart(2, "0"),
      url: body.url || "",
      domain: body.domain || "",
      tag: body.tag || "",
      imageUrl,
      mediaId: body.mediaId || null,
      desc: body.desc || "",
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
  const row = await prisma.webSite.update({
    where: { id: body.id },
    data: {
      num: body.num,
      url: body.url,
      domain: body.domain,
      tag: body.tag,
      imageUrl,
      mediaId: body.mediaId ?? null,
      desc: body.desc,
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
  await prisma.webSite.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
