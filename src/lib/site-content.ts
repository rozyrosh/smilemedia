import { prisma } from "@/lib/db";
import {
  hero as fallbackHero,
  services as fallbackServices,
  campaignBanner as fallbackCampaign,
  webWork as fallbackWebWork,
} from "@/data/content";
import {
  designs as fallbackDesigns,
  portfolioMeta as fallbackPortfolioMeta,
  type Design,
  type DesignCategory,
} from "@/data/designs";

export async function getHeroContent() {
  try {
    const [s, slideRows] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: "main" } }),
      prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

    const slides =
      slideRows.length > 0
        ? slideRows.map((r) => ({
            title: [r.titleLine1, r.titleLine2] as [string, string],
            image: r.imageUrl,
          }))
        : fallbackHero.slides;

    if (!s) {
      return { ...fallbackHero, slides };
    }

    return {
      ...fallbackHero,
      eyebrow: s.heroEyebrow,
      headline: [s.heroHeadline1, s.heroHeadline2] as [string, string],
      sub: s.heroSub,
      stats: fallbackHero.stats,
      slides,
    };
  } catch {
    return fallbackHero;
  }
}

export async function getServicesContent() {
  try {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    if (!rows.length) return fallbackServices;
    return rows.map((s) => ({
      num: s.num,
      name: s.name,
      image: s.imageUrl,
      items: JSON.parse(s.itemsJson || "[]") as string[],
    }));
  } catch {
    return fallbackServices;
  }
}

export async function getCampaignSlides() {
  try {
    const rows = await prisma.campaignSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (!rows.length) return fallbackCampaign.slides;
    return rows.map((r) => r.imageUrl);
  } catch {
    return fallbackCampaign.slides;
  }
}

export async function getDesignsContent(): Promise<Design[]> {
  try {
    const rows = await prisma.design.findMany({ orderBy: { sortOrder: "asc" } });
    if (!rows.length) return fallbackDesigns;
    return rows.map((d, index) => ({
      id: d.id,
      file: d.title,
      image: d.imageUrl,
      title: d.title,
      category: d.category as DesignCategory,
      grid: undefined,
    }));
  } catch {
    return fallbackDesigns;
  }
}

export async function getPortfolioDesigns(): Promise<Design[]> {
  try {
    const rows = await prisma.design.findMany({
      where: { showInPortfolio: true },
      orderBy: { sortOrder: "asc" },
    });
    if (!rows.length) {
      return fallbackDesigns.slice(0, 12).map((d, i) => ({
        ...d,
        grid: `bc-${(i % 12) + 1}`,
      }));
    }
    return rows.map((d, i) => ({
      id: d.id,
      file: d.title,
      image: d.imageUrl,
      title: d.title,
      category: d.category as DesignCategory,
      grid: `bc-${(i % 12) + 1}`,
    }));
  } catch {
    return fallbackDesigns.slice(0, 12);
  }
}

export async function getPortfolioMetaContent() {
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (!s) return fallbackPortfolioMeta;
    return {
      ...fallbackPortfolioMeta,
      eyebrow: s.portfolioEyebrow,
      title: s.portfolioTitle,
      sub: s.portfolioSub || fallbackPortfolioMeta.sub,
    };
  } catch {
    return fallbackPortfolioMeta;
  }
}

export async function getWebWorkContent() {
  try {
    const rows = await prisma.webSite.findMany({ orderBy: { sortOrder: "asc" } });
    if (!rows.length) return fallbackWebWork;
    return {
      ...fallbackWebWork,
      sites: rows.map((s) => ({
        num: s.num,
        url: s.url,
        domain: s.domain,
        tag: s.tag,
        image: s.imageUrl,
        desc: s.desc,
      })),
    };
  } catch {
    return fallbackWebWork;
  }
}

export async function getGalleryMedia() {
  try {
    return await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}
