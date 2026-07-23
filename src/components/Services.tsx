"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { services as fallbackServices } from "@/data/content";
import { Reveal } from "./Reveal";

type ServiceItem = (typeof fallbackServices)[number];

function ServiceCardImage({
  src,
  fallback,
}: {
  src: string;
  fallback?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt=""
      fill
      className="service-card-bg"
      sizes="(max-width: 768px) 90vw, 760px"
      quality={90}
      onError={() => {
        if (fallback) setImgSrc(fallback);
      }}
    />
  );
}

export function Services({ data = fallbackServices }: { data?: ServiceItem[] }) {
  const services = data;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateFromScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    setProgress(pct);
    const cardWidth = el.querySelector(".service-card")?.clientWidth ?? 1;
    const gap = 24;
    setActive(Math.round(el.scrollLeft / (cardWidth + gap)));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateFromScroll();
    el.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => el.removeEventListener("scroll", updateFromScroll);
  }, [updateFromScroll]);

  const scrollBy = (dir: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector(".service-card") as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 380) + 24;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="services" className="services-section">
      <aside className="services-wordmark" aria-hidden>
        <span className="wm-line" />
        SERVICES — STRATEGY — DESIGN
      </aside>

      <Reveal className="services-header">
        <div>
          <p className="section-eyebrow">Our Service</p>
          <h2 className="section-title">
            WHAT WE
            <br />
            <span className="red">OFFER</span>
          </h2>
        </div>
        <div>
          <div className="services-counter">
            <span className="dot" />
            <span>
              <span className="current">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              <span className="total">/ 06 — IN VIEW</span>
            </span>
          </div>
          <p className="section-sub">
            Five complete service pillars to cover every dimension of your
            brand&apos;s journey.
          </p>
          <div className="services-drag-hint">
            <span>Drag to explore</span>
            <span className="hint-line" />
            <span className="hint-arrow">→</span>
          </div>
        </div>
      </Reveal>

      <div className="services-carousel-wrapper">
        <button
          type="button"
          className="carousel-btn prev"
          aria-label="Previous service"
          onClick={() => scrollBy(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className="carousel-btn next"
          aria-label="Next service"
          onClick={() => scrollBy(1)}
        >
          →
        </button>

        <div className="services-carousel" ref={carouselRef}>
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.08} className="service-card-wrap">
              <article className="service-card">
                <ServiceCardImage
                  src={service.image}
                  fallback={service.fallback}
                />
                <div className="service-card-overlay" />
                <div className="service-card-bignum">{service.num}</div>
                <div className="service-card-icon">↗</div>
                <div className="service-card-content">
                  <div className="service-num">{service.num}</div>
                  <div className="service-name">
                    {service.name.split(" ").map((w, idx) => (
                      <span key={w}>
                        {w}
                        {idx < service.name.split(" ").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="service-divider" />
                  <ul className="service-items">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="carousel-dots">
          {services.map((s, i) => (
            <button
              key={s.num}
              type="button"
              className={`carousel-dot ${i === active ? "active" : ""}`}
              aria-label={`Go to service ${s.num}`}
              onClick={() => {
                const el = carouselRef.current;
                const card = el?.querySelector(".service-card") as HTMLElement;
                if (el && card) {
                  el.scrollTo({
                    left: i * (card.offsetWidth + 24),
                    behavior: "smooth",
                  });
                }
              }}
            />
          ))}
        </div>

        <div className="services-progress" aria-hidden>
          <div className="bar" style={{ transform: `scaleX(${progress || 0.01})` }} />
        </div>
      </div>
    </section>
  );
}
