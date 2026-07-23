import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const rows = await prisma.campaignSlide.findMany({
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
  const count = await prisma.campaignSlide.count();
  let imageUrl = body.imageUrl || "";
  if (body.mediaId) {
    const media = await prisma.media.findUnique({ where: { id: body.mediaId } });
    if (media) imageUrl = media.url;
  }
  const row = await prisma.campaignSlide.create({
    data: {
      imageUrl,
      mediaId: body.mediaId || null,
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
  // Replace all slides from gallery picks
  if (Array.isArray(body.slides)) {
    await prisma.campaignSlide.deleteMany();
    const created = [];
    for (let i = 0; i < body.slides.length; i++) {
      const slide = body.slides[i];
      let imageUrl = slide.imageUrl || "";
      if (slide.mediaId) {
        const media = await prisma.media.findUnique({
          where: { id: slide.mediaId },
        });
        if (media) imageUrl = media.url;
      }
      created.push(
        await prisma.campaignSlide.create({
          data: {
            imageUrl,
            mediaId: slide.mediaId || null,
            sortOrder: i,
          },
        }),
      );
    }
    return NextResponse.json(created);
  }
  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.campaignSlide.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
