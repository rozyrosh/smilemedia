"use client";

import Image from "next/image";
import Link from "next/link";
import { useDrag } from "@use-gesture/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { webWork as fallbackWebWork } from "@/data/content";
import { Reveal } from "./Reveal";

type WebWorkData = typeof fallbackWebWork;
type Site = WebWorkData["sites"][number];

const AUTO_MS = 4000;
const TRANSITION_MS = 650;

function WebCard({
  site,
  suppressClick,
}: {
  site: Site;
  suppressClick: () => boolean;
}) {
  return (
    <Link
      className="web-card"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      onClick={(e) => {
        if (suppressClick()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
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
            draggable={false}
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
  const [dragX, setDragX] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const didDrag = useRef(false);

  const slideCount = sites.length;
  const loopSites = slideCount > 0 ? [...sites, ...sites.slice(0, 3)] : [];

  const getStepPx = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return 360;
    const styles = getComputedStyle(el);
    const visible = Math.max(1, parseFloat(styles.getPropertyValue("--web-visible")) || 3);
    const gap = parseFloat(styles.getPropertyValue("--web-gap")) || 32;
    return el.clientWidth / visible + gap / visible;
  }, []);

  const advance = useCallback(() => {
    if (slideCount <= 1) return;
    setAnimate(true);
    setDragX(0);
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
      setDragX(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [index, slideCount]);

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [dx], cancel }) => {
      if (slideCount <= 1) {
        cancel();
        return;
      }

      if (active) {
        if (Math.abs(mx) > 6) didDrag.current = true;
        setPaused(true);
        setAnimate(false);
        setDragX(mx);
        return;
      }

      const step = getStepPx();
      const threshold = step * 0.22;
      let next = index;
      if (mx < -threshold || (vx > 0.35 && dx < 0)) next = index + 1;
      else if (mx > threshold || (vx > 0.35 && dx > 0)) next = Math.max(0, index - 1);

      setDragX(0);
      setAnimate(true);
      if (next !== index) setIndex(next);

      window.setTimeout(() => {
        didDrag.current = false;
        setPaused(false);
      }, 80);
    },
    {
      axis: "x",
      filterTaps: true,
      pointer: { touch: true },
      preventScroll: true,
    },
  );

  const suppressClick = useCallback(() => didDrag.current, []);

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
        ref={carouselRef}
        className="web-carousel"
        {...bind()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!didDrag.current) setPaused(false);
        }}
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
            transform: `translate3d(calc(-${index} * (100% + var(--web-gap)) / var(--web-visible) + ${dragX}px), 0, 0)`,
          }}
        >
          {loopSites.map((site, i) => (
            <div className="web-carousel-slide" key={`${site.domain}-${i}`}>
              <WebCard site={site} suppressClick={suppressClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
