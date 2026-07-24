import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * Public health check for Hostinger debugging.
 * Open: /api/health/db
 */
export async function GET() {
  const url = process.env.DATABASE_URL || "";
  const masked = url
    ? url.replace(/:([^:@/]+)@/, ":***@")
    : "(DATABASE_URL not set)";

  try {
    const settings = await prisma.siteSettings.count();
    const media = await prisma.media.count();
    return NextResponse.json({
      ok: true,
      databaseUrl: masked,
      counts: { settings, media },
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        databaseUrl: masked,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 503 },
    );
  }
}
