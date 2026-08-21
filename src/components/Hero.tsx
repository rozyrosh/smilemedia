"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { hero as fallbackHero } from "@/data/content";
import { FlipText } from "@/components/ui/FlipText";
import { HeroBgGallery } from "@/components/HeroBgGallery";

type HeroData = typeof fallbackHero;

export function Hero({ data = fallbackHero }: { data?: HeroData }) {
  const hero = data;
  const slides = hero.slides?.length ? hero.slides : fallbackHero.slides;
  const reduceMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onIndexChange = useCallback((next: number) => {
    setSlideIndex(next);
  }, []);

  const active = slides[slideIndex] ?? slides[0];
  const [line1, line2] = active.title;

  return (
    <section ref={ref} className="hero" id="top">
      <HeroBgGallery
        slides={slides}
        index={slideIndex}
        onIndexChange={onIndexChange}
      />

      <div className="hero-letterbox bottom">
        <span className="hero-letterbox-mark" aria-hidden />
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <span className="hero-letterbox-meta" aria-hidden>
          SMILE MEDIA
        </span>
      </div>

      <motion.div className="hero-layout" style={{ opacity }}>
        <div className="hero-content">
          <span className="hero-accent-rail" aria-hidden />
          <span className="hero-ghost" aria-hidden>
            {line2}
          </span>

          <motion.p
            className="hero-live"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-live-dot" aria-hidden />
            On air
            <span className="hero-live-sep" aria-hidden>
              /
            </span>
            <span className="hero-live-index">
              {String(slideIndex + 1).padStart(2, "0")}
              <span className="hero-live-total">
                {" "}
                · {String(slides.length).padStart(2, "0")}
              </span>
            </span>
          </motion.p>

          <h1 className="hero-headline" aria-label={`${line1} ${line2}`}>
            <span className="hero-headline-swap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${slideIndex}-a`}
                  className="hero-headline-line"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 18, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -12, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FlipText duration={1.6} pause={0} loop={false}>
                    {line1}
                  </FlipText>
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span className="hero-headline-swap hero-headline-swap-red">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${slideIndex}-b`}
                  className="hero-headline-line"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 18, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -12, filter: "blur(4px)" }
                  }
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <FlipText
                    className="red"
                    duration={1.6}
                    pause={0}
                    loop={false}
                  >
                    {line2}
                  </FlipText>
                </motion.span>
              </AnimatePresence>
              <svg
                key={`smile-${slideIndex}`}
                className="hero-smile-line"
                viewBox="0 0 320 36"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  className="hero-smile-line-path"
                  d="M8 8 C90 34, 230 34, 312 8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <motion.p
            className="hero-sub"
            key={`sub-${slideIndex}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: reduceMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link href="#services" className="btn-primary hero-cta-primary">
              Explore Services
            </Link>
            <Link href="#contact" className="btn-ghost">
              Let&apos;s Talk ↗
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="hero-scroll-line">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
