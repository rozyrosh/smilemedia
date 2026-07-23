"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

const HERO_SLIDES = [
  "/assets/images/hero-bg.png",
  "/assets/images/hero-bg.png",
  "/assets/images/hero-bg.png",
  "/assets/images/hero-bg.png",
] as const;

const SLIDE_HOLD_MS = 5200;
const SLIDE_EASE = [0.77, 0, 0.175, 1] as const;

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

export function HeroBgGallery() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const goTo = (next: number) => {
    if (next === index) return;
    const forward =
      next > index || (index === HERO_SLIDES.length - 1 && next === 0);
    setDirection(forward ? 1 : -1);
    setIndex(next);
  };

  return (
    <div className="hero-media">
      <div className="hero-gallery" aria-hidden="true">
        {reduceMotion ? (
          <div className="hero-gallery-slide is-static">
            <HeroGlitchSlide src={HERO_SLIDES[0]} priority />
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              className="hero-gallery-slide"
              custom={direction}
              variants={{
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
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 1.35,
                ease: SLIDE_EASE,
              }}
            >
              <HeroGlitchSlide
                src={HERO_SLIDES[index]}
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="hero-media-overlay" aria-hidden="true" />

      <div className="hero-gallery-dots" role="tablist" aria-label="Hero slides">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className={`hero-gallery-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
