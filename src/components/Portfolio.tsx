"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  designFilters,
  portfolioMeta as fallbackMeta,
  portfolioPreview as fallbackPreview,
  designs as fallbackDesigns,
  type Design,
  type DesignCategory,
} from "@/data/designs";
import { DomeGallery } from "@/components/ui/DomeGallery";
import { Particles } from "@/components/ui/Particles";
import { Reveal } from "./Reveal";

const PORTFOLIO_PARTICLE_COLORS = ["#122040", "#2a5a99", "#e84545"];

type PortfolioProps = {
  designs?: Design[];
  portfolioItems?: Design[];
  meta?: typeof fallbackMeta;
};

export function Portfolio({
  designs = fallbackDesigns,
  portfolioItems = fallbackPreview,
  meta = fallbackMeta,
}: PortfolioProps) {
  const [filter, setFilter] = useState<DesignCategory | "All">("All");

  const items = useMemo(() => {
    if (filter === "All") {
      return portfolioItems;
    }
    return designs.filter((d) => d.category === filter).slice(0, 12);
  }, [filter, designs, portfolioItems]);

  const galleryImages = useMemo(
    () => items.map((item) => ({ src: item.image, alt: item.title })),
    [items],
  );

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-particles-bg" aria-hidden="true">
        <Particles
          particleColors={PORTFOLIO_PARTICLE_COLORS}
          particleCount={5800}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={70}
          moveParticlesOnHover
          particleHoverFactor={0.6}
          alphaParticles
          sizeRandomness={0.9}
          disableRotation={false}
        />
      </div>

      <Reveal className="portfolio-header">
        <div>
          <p className="section-eyebrow">{meta.eyebrow}</p>
          <h2 className="section-title">
            OUR <span className="red">ARTISTRY</span>
          </h2>
          <p className="section-sub">{meta.sub}</p>
        </div>
        <div className="portfolio-filters">
          {designFilters.map((f) => (
            <button
              key={f}
              type="button"
              className={`pf-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal className="portfolio-dome-wrap">
        <DomeGallery
          key={filter}
          images={galleryImages}
          overlayBlurColor="#ffffff"
          grayscale={false}
          imageBorderRadius="6px"
          openedImageBorderRadius="8px"
          openedImageWidth="min(90vw, 420px)"
          openedImageHeight="min(80vh, 560px)"
          minRadius={560}
          fit={0.98}
          fitBasis="max"
          padFactor={0.02}
          dragSensitivity={18}
          autoRotate
          autoRotateSpeed={5}
        />
        <p className="portfolio-dome-hint">
          Drag to explore · Auto-rotating · Click to enlarge
        </p>
      </Reveal>

      <Reveal className="portfolio-load-more-wrap" delay={0.12}>
        <Link href="/designs" className="portfolio-load-more">
          Load More <span className="arrow">↗</span>
        </Link>
        <p className="portfolio-load-more-note">
          View all {designs.length} design works in our full gallery
        </p>
      </Reveal>
    </section>
  );
}
