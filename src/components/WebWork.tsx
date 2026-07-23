"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { webWork as fallbackWebWork } from "@/data/content";
import { Reveal } from "./Reveal";

type WebWorkData = typeof fallbackWebWork;
type Site = WebWorkData["sites"][number];

const AUTO_MS = 4000;
const TRANSITION_MS = 650;

function WebCard({ site }: { site: Site }) {
  return (
    <Link
      className="web-card"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="web-card-num">{site.num}</div>
      <div className="web-frame">
        <div className="web-frame-bar">
          <span className="web-frame-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="web-frame-url">{site.url}</span>
        </div>
        <div className="web-shot">
          <Image
            src={site.image}
            alt={`${site.domain} preview`}
            fill
            className="web-shot-img"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="web-body">
        <span className="web-tag">{site.tag}</span>
        <div className="web-domain">{site.domain}</div>
        <p className="web-desc">{site.desc}</p>
        <span className="web-cta">
          Visit Live <span className="arrow">↗</span>
        </span>
      </div>
    </Link>
  );
}

export function WebWork({ data = fallbackWebWork }: { data?: WebWorkData }) {
  const sites = data.sites;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  const slideCount = sites.length;
  const loopSites = slideCount > 0 ? [...sites, ...sites.slice(0, 3)] : [];

  const advance = useCallback(() => {
    if (slideCount <= 1) return;
    setAnimate(true);
    setIndex((i) => i + 1);
  }, [slideCount]);

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const id = window.setInterval(advance, AUTO_MS);
    return () => window.clearInterval(id);
  }, [advance, paused, slideCount]);

  useEffect(() => {
    if (index < slideCount) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [index, slideCount]);

  return (
    <section id="web-work" className="web-work-section">
      <Reveal className="web-header">
        <div>
          <p className="section-eyebrow">Web Development</p>
          <h2 className="section-title">
            WEBSITES
            <br />
            <span className="red">WE BUILT</span>
          </h2>
        </div>
        <div>
          <p className="section-sub">{data.sub}</p>
        </div>
      </Reveal>

      <div
        className="web-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <div
          className={`web-carousel-track${animate ? " is-animating" : ""}`}
          style={{
            transform: `translate3d(calc(-${index} * (100% + var(--web-gap)) / var(--web-visible)), 0, 0)`,
          }}
        >
          {loopSites.map((site, i) => (
            <div
              className="web-carousel-slide"
              key={`${site.domain}-${i}`}
            >
              <WebCard site={site} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
