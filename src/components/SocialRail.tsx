"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { contact } from "@/data/content";

export function SocialRail() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle vertical drift while staying on-screen for the full page
  const y = useTransform(scrollY, [0, 2400], [0, 48]);

  return (
    <aside className="social-rail" aria-label="Social media">
      <motion.nav
        className="social-rail-card"
        style={reduceMotion ? undefined : { y }}
      >
        <span className="social-rail-line" aria-hidden />
        {contact.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="social-rail-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            {s.label}
          </a>
        ))}
        <span className="social-rail-line" aria-hidden />
      </motion.nav>
    </aside>
  );
}
