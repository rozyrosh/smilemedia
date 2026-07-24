import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { hero, services, campaignBanner, webWork } from "../src/data/content";
import { designs, portfolioMeta } from "../src/data/designs";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: {
      id: "main",
      heroEyebrow: hero.eyebrow,
      heroHeadline1: hero.headline[0],
      heroHeadline2: hero.headline[1],
      heroSub: hero.sub,
      portfolioEyebrow: portfolioMeta.eyebrow,
      portfolioTitle: portfolioMeta.title,
      portfolioSub: portfolioMeta.sub,
    },
    update: {},
  });

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    for (let i = 0; i < services.length; i++) {
      const s = services[i];
      await prisma.service.create({
        data: {
          num: s.num,
          name: s.name,
          imageUrl: s.image,
          itemsJson: JSON.stringify(s.items),
          sortOrder: i,
        },
      });
    }
  }

  const designCount = await prisma.design.count();
  if (designCount === 0) {
    for (let i = 0; i < designs.length; i++) {
      const d = designs[i];
      const media = await prisma.media.create({
        data: {
          url: d.image,
          filename: d.file,
          alt: d.title,
        },
      });
      await prisma.design.create({
        data: {
          title: d.title,
          category: d.category,
          imageUrl: d.image,
          mediaId: media.id,
          showInPortfolio: i < 12,
          sortOrder: i,
        },
      });
    }
  }

  const heroSlideCount = await prisma.heroSlide.count();
  if (heroSlideCount === 0) {
    for (let i = 0; i < hero.slides.length; i++) {
      const slide = hero.slides[i];
      const filename = slide.image.split("/").pop() || `hero-slide-${i}`;
      const media = await prisma.media.create({
        data: {
          url: slide.image,
          filename: decodeURIComponent(filename),
          alt: `${slide.title[0]} ${slide.title[1]}`,
        },
      });
      await prisma.heroSlide.create({
        data: {
          titleLine1: slide.title[0],
          titleLine2: slide.title[1],
          imageUrl: slide.image,
          mediaId: media.id,
          sortOrder: i,
        },
      });
    }
  }

  const slideCount = await prisma.campaignSlide.count();
  if (slideCount === 0) {
    for (let i = 0; i < campaignBanner.slides.length; i++) {
      const url = campaignBanner.slides[i];
      const filename = url.split("/").pop() || `slide-${i}`;
      const media = await prisma.media.create({
        data: {
          url,
          filename: decodeURIComponent(filename),
          alt: `Campaign slide ${i + 1}`,
        },
      });
      await prisma.campaignSlide.create({
        data: {
          imageUrl: url,
          mediaId: media.id,
          sortOrder: i,
        },
      });
    }
  }

  const webCount = await prisma.webSite.count();
  if (webCount === 0) {
    for (let i = 0; i < webWork.sites.length; i++) {
      const s = webWork.sites[i];
      await prisma.webSite.create({
        data: {
          num: s.num,
          url: s.url,
          domain: s.domain,
          tag: s.tag,
          imageUrl: s.image,
          desc: s.desc,
          sortOrder: i,
        },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
