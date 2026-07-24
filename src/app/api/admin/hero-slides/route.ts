import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { hero as fallbackHero } from "@/data/content";

function fallbackSlides() {
  return fallbackHero.slides.map((slide, i) => ({
    id: `fallback-${i}`,
    titleLine1: slide.title[0],
    titleLine2: slide.title[1],
    imageUrl: slide.image,
    mediaId: null,
    sortOrder: i,
    createdAt: new Date().toISOString(),
    media: null,
  }));
}

export async function GET() {
  try {
    const rows = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
      include: { media: true },
    });
    if (!rows.length) return NextResponse.json(fallbackSlides());
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[hero-slides GET]", err);
    return NextResponse.json(fallbackSlides());
  }
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!Array.isArray(body.slides)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await prisma.heroSlide.deleteMany();
    const created = [];
    for (let i = 0; i < body.slides.length; i++) {
      const slide = body.slides[i];
      let imageUrl = String(slide.imageUrl || "");
      let mediaId = slide.mediaId || null;
      if (mediaId) {
        const media = await prisma.media.findUnique({ where: { id: mediaId } });
        if (media) imageUrl = media.url;
        else mediaId = null;
      }
      if (!imageUrl) continue;
      created.push(
        await prisma.heroSlide.create({
          data: {
            titleLine1: String(slide.titleLine1 || "").trim() || "SLIDE",
            titleLine2: String(slide.titleLine2 || "").trim() || "",
            imageUrl,
            mediaId,
            sortOrder: i,
          },
        }),
      );
    }
    return NextResponse.json(created);
  } catch (err) {
    console.error("[hero-slides PUT]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 },
    );
  }
}
