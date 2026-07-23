"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero as fallbackHero } from "@/data/content";
// import { AnimatedOutline } from "@/components/ui/AnimatedOutline";
import { FlipText } from "@/components/ui/FlipText";
import { HeroBgGallery } from "@/components/HeroBgGallery";

type HeroData = typeof fallbackHero;

export function Hero({ data = fallbackHero }: { data?: HeroData }) {
  const hero = data;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="hero" id="top">
      <HeroBgGallery />

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
            aria-label={`${hero.headline[0]} ${hero.headline[1]}`}
          >
            <FlipText duration={2.2} pause={3} loop>
              {hero.headline[0]}
            </FlipText>
            <br />
            <FlipText className="red" duration={2.2} pause={3} loop>
              {hero.headline[1]}
            </FlipText>
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
