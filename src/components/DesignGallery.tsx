"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  designFilters,
  designs as fallbackDesigns,
  type Design,
  type DesignCategory,
} from "@/data/designs";
import { Footer } from "./Footer";
import { ImageLightbox } from "./ImageLightbox";
import { Reveal } from "./Reveal";

export function DesignGallery({ designs = fallbackDesigns }: { designs?: Design[] }) {
  const [filter, setFilter] = useState<DesignCategory | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    if (filter === "All") return designs;
    return designs.filter((d) => d.category === filter);
  }, [filter, designs]);

  const lightboxItems = useMemo(
    () =>
      items.map((item) => ({
        src: item.image,
        alt: item.title,
        title: item.title,
        category: item.category,
      })),
    [items],
  );

  return (
    <>
      <section className="designs-hero">
        <div className="designs-hero-bg" aria-hidden>
          GALLERY
        </div>
        <Reveal className="designs-hero-inner">
          <Link href="/#portfolio" className="designs-back">
            ← Back to Home
          </Link>
          <p className="section-eyebrow muted">Full Collection</p>
          <h1 className="designs-title">
            ALL <span className="red">DESIGNS</span>
          </h1>
          <p className="designs-sub">
            Browse every flyer, banner, social post, and campaign creative from
            Smile Media — {designs.length} works and counting.
          </p>
          <div className="portfolio-filters designs-filters">
            {designFilters.map((f) => (
              <button
                key={f}
                type="button"
                className={`pf-btn ${filter === f ? "active" : ""}`}
                onClick={() => {
                  setFilter(f);
                  setLightboxIndex(null);
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="designs-grid-section">
        <Reveal className="designs-grid">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="designs-card designs-card-btn"
              style={{ transitionDelay: `${(i % 12) * 0.04}s` }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="designs-card-image"
                sizes="(max-width:768px) 100vw, 25vw"
              />
              <div className="designs-card-overlay">
                <span className="designs-card-tag">{item.category}</span>
                <h2 className="designs-card-title">{item.title}</h2>
              </div>
            </button>
          ))}
        </Reveal>

        {items.length === 0 && (
          <p className="designs-empty">No designs in this category yet.</p>
        )}
      </section>

      <ImageLightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      <Footer />
    </>
  );
}
