"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function HeroSmileFace() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotY = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.6 });
  const tilt = useMotionTemplate`rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(px * 28);
      rawY.set(py * -22);
    };

    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY, reduceMotion]);

  return (
    <div className="hero-smile-wrap" ref={wrapRef} aria-hidden="true">
      <div className="hero-smile-stage">
        <motion.div
          className="hero-smile-float"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -14, 0], scale: [1, 1.02, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <motion.div
            className="hero-smile-orb"
            style={reduceMotion ? undefined : { transform: tilt }}
          >
            <div className="hero-smile-sheen" />
            <div className="hero-smile-face">
              <span className="hero-smile-eye left" />
              <span className="hero-smile-eye right" />
              <span className="hero-smile-cheek left" />
              <span className="hero-smile-cheek right" />
              <svg
                className="hero-smile-mouth"
                viewBox="0 0 120 60"
                fill="none"
                aria-hidden
              >
                <path
                  d="M18 18 C38 48, 82 48, 102 18"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="hero-smile-rim" />
          </motion.div>
        </motion.div>
        <div className="hero-smile-shadow" />
      </div>
    </div>
  );
}
