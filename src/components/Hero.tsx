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
// import { AnimatedOutline } from "@/components/ui/AnimatedOutline";
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
        <p className="hero-eyebrow">{hero.eyebrow}</p>
      </div>

      <motion.div className="hero-layout" style={{ opacity }}>
        {/*
          Hero person image (person2.png) + animated outline — commented out.
          See /comments for details.
        <div className="hero-person-wrap">
          <div className="hero-person-stack">
            <img
              src="/assets/images/person2.png"
              alt=""
              width={895}
              height={673}
              className="hero-person"
              decoding="async"
              fetchPriority="high"
            />
            <AnimatedOutline className="hero-person-outline" duration={4} />
          </div>
        </div>
        */}

        <div className="hero-content">
          <h1
            className="hero-headline"
            aria-label={`${line1} ${line2}`}
          >
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
            <span className="hero-headline-swap">
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
            </span>
          </h1>
          <p className="hero-sub">{hero.sub}</p>

          <div className="hero-actions">
            <Link href="#services" className="btn-primary">
              Explore Services
            </Link>
            <Link href="#contact" className="btn-ghost">
              Let&apos;s Talk ↗
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="hero-scroll-line">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
