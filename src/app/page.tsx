import { Contact } from "@/components/Contact";
import { Difference } from "@/components/Difference";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { SocialRail } from "@/components/SocialRail";
import { SuccessStories } from "@/components/SuccessStories";
import { VisionMission } from "@/components/VisionMission";
import { WebWork } from "@/components/WebWork";
import {
  getDesignsContent,
  getHeroContent,
  getPortfolioDesigns,
  getPortfolioMetaContent,
  getServicesContent,
  getWebWorkContent,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [hero, services, designs, portfolioItems, portfolioMeta, webWork] =
    await Promise.all([
      getHeroContent(),
      getServicesContent(),
      getDesignsContent(),
      getPortfolioDesigns(),
      getPortfolioMetaContent(),
      getWebWorkContent(),
    ]);

  return (
    <>
      <SocialRail />
      <Hero data={hero} />
      <MarqueeStrip />
      <Services data={services} />
      <Portfolio
        designs={designs}
        portfolioItems={portfolioItems}
        meta={portfolioMeta}
      />
      <SuccessStories />
      <Difference />
      <WebWork data={webWork} />
      <VisionMission />
      <Contact />
      <Footer />
    </>
  );
}
