"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import { hero as fallbackHero } from "@/data/content";

export type HeroSlide = {
  title: [string, string];
  image: string;
};

const SLIDE_HOLD_MS = 5200;
const SLIDE_EASE = [0.77, 0, 0.175, 1] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-28%" : "28%",
    opacity: 0.55,
  }),
};

function HeroGlitchSlide({
  src,
  priority,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="hero-glitch">
      <div className="hero-glitch-zoom">
        <img
          src={src}
          alt=""
          className="hero-bg-image hero-glitch-base"
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
        <img
          src={src}
          alt=""
          className="hero-bg-image hero-glitch-channel hero-glitch-r"
          decoding="async"
        />
        <img
          src={src}
          alt=""
          className="hero-bg-image hero-glitch-channel hero-glitch-c"
          decoding="async"
        />
        <div
          className="hero-glitch-slice hero-glitch-slice-a"
          style={{ backgroundImage: `url(${src})` }}
        />
        <div
          className="hero-glitch-slice hero-glitch-slice-b"
          style={{ backgroundImage: `url(${src})` }}
        />
      </div>
      <div className="hero-glitch-scanlines" />
      <div className="hero-glitch-flash" />
    </div>
  );
}

function HeroFillSlide({
  src,
  priority,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="hero-fill">
      <img
        src={src}
        alt=""
        className="hero-fill-image"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}

type HeroBgGalleryProps = {
  slides?: HeroSlide[];
  index: number;
  onIndexChange: (index: number) => void;
};

export function HeroBgGallery({
  slides = fallbackHero.slides,
  index,
  onIndexChange,
}: HeroBgGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const count = slides.length;

  useEffect(() => {
    if (reduceMotion || count <= 1) return;
    const id = window.setInterval(() => {
      setDirection(1);
      onIndexChange((index + 1) % count);
    }, SLIDE_HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, count, index, onIndexChange]);

  const goTo = (next: number) => {
    if (next === index) return;
    const forward = next > index || (index === count - 1 && next === 0);
    setDirection(forward ? 1 : -1);
    onIndexChange(next);
  };

  if (!count) return null;

  const src = slides[index].image;

  return (
    <div className="hero-media">
      {/* Zoomed duplicate behind — fills left/right letterbox gaps */}
      <div className="hero-gallery hero-gallery-fill" aria-hidden="true">
        {reduceMotion ? (
          <div className="hero-gallery-slide is-static">
            <HeroFillSlide src={slides[0].image} priority />
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`fill-${index}`}
              className="hero-gallery-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1.35,
                ease: SLIDE_EASE,
              }}
            >
              <HeroFillSlide src={src} priority={index === 0} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Main gallery — full image, contained */}
      <div className="hero-gallery hero-gallery-main" aria-hidden="true">
        {reduceMotion ? (
          <div className="hero-gallery-slide is-static">
            <HeroGlitchSlide src={slides[0].image} priority />
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={`main-${index}`}
              className="hero-gallery-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1.35,
                ease: SLIDE_EASE,
              }}
            >
              <HeroGlitchSlide src={src} priority={index === 0} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="hero-media-overlay" aria-hidden="true" />

      <div className="hero-gallery-dots" role="tablist" aria-label="Hero slides">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${slide.title.join(" ")}`}
            className={`hero-gallery-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
