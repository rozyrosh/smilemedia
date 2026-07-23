import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(
    rows.map((s) => ({ ...s, items: JSON.parse(s.itemsJson || "[]") })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const count = await prisma.service.count();
  const row = await prisma.service.create({
    data: {
      num: body.num || String(count + 1).padStart(2, "0"),
      name: body.name || "New Service",
      imageUrl: body.imageUrl || "",
      mediaId: body.mediaId || null,
      itemsJson: JSON.stringify(body.items || []),
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
  const row = await prisma.service.update({
    where: { id: body.id },
    data: {
      num: body.num,
      name: body.name,
      imageUrl: body.imageUrl,
      mediaId: body.mediaId ?? null,
      itemsJson: JSON.stringify(body.items || []),
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
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
