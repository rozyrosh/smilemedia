"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AnimatedOutlineProps = {
  className?: string;
  /** Stroke color. Defaults to site --red-light. */
  stroke?: string;
  strokeWidth?: number;
  /** One full loop around the silhouette, in seconds. */
  duration?: number;
  /** SVG path `d` attribute. Defaults to the hero person silhouette. */
  pathD?: string;
};

export const HERO_PERSON_OUTLINE_PATH =
  "M703.0,79.0 C686.7,68.3 650.2,108.8 640.0,106.0 C629.8,103.2 644.0,75.8 642.0,62.0 C640.0,48.2 633.5,33.3 628.0,23.0 C622.5,12.7 623.8,3.8 609.0,0.0 C594.2,-3.8 558.8,-7.7 539.0,0.0 C519.2,7.7 499.7,30.7 490.0,46.0 C480.3,61.3 479.0,81.3 481.0,92.0 C483.0,102.7 498.3,100.8 502.0,110.0 C505.7,119.2 501.0,140.5 503.0,147.0 C505.0,153.5 502.5,134.7 514.0,149.0 C525.5,163.3 562.2,216.2 572.0,233.0 C581.8,249.8 583.7,246.2 573.0,250.0 C562.3,253.8 540.2,289.2 532.0,304.0 C523.8,318.8 511.5,314.2 496.0,325.0 C480.5,335.8 465.2,376.5 451.0,392.0 C436.8,407.5 411.5,381.3 396.0,386.0 C380.5,390.7 388.3,404.2 371.0,412.0 C353.7,419.8 316.7,420.5 297.0,426.0 C277.3,431.5 285.3,442.3 267.0,441.0 C248.7,439.7 233.2,326.3 223.0,308.0 C212.8,289.7 178.5,313.7 157.0,296.0 C135.5,278.3 190.7,466.3 212.0,481.0 C233.3,495.7 232.8,481.2 224.0,489.0 C215.2,496.8 176.7,489.7 156.0,499.0 C135.3,508.3 143.7,497.3 128.0,511.0 C112.3,524.7 84.7,545.5 63.0,566.0 C41.3,586.5 -8.5,616.5 3.0,634.0 C14.5,651.5 -14.2,672.0 22.0,672.0 C58.2,672.0 260.2,672.0 292.0,672.0 C323.8,672.0 300.7,614.7 322.0,629.0 C343.3,643.3 306.0,672.0 324.0,672.0 C342.0,672.0 861.7,672.0 894.0,672.0 C926.3,672.0 900.7,622.0 891.0,616.0 C881.3,610.0 782.3,619.7 768.0,613.0 C753.7,606.3 767.0,321.7 767.0,303.0 C767.0,284.3 727.7,317.3 731.0,304.0 C734.3,290.7 715.7,264.3 720.0,250.0 C724.3,235.7 748.5,224.7 737.0,213.0 C725.5,201.3 719.3,180.7 738.0,170.0 C756.7,159.3 719.3,89.7 703.0,79.0 Z";

export function AnimatedOutline({
  className,
  stroke = "#ff4d5e",
  strokeWidth = 3,
  duration = 4,
  pathD = HERO_PERSON_OUTLINE_PATH,
}: AnimatedOutlineProps) {
  const mainRef = useRef<SVGPathElement>(null);
  const ghostARef = useRef<SVGPathElement>(null);
  const ghostBRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const paths = [mainRef.current, ghostARef.current, ghostBRef.current].filter(
      (p): p is SVGPathElement => Boolean(p),
    );
    if (!paths.length) return;

    const total = paths[0].getTotalLength();
    if (!total || !Number.isFinite(total)) return;

    // Short segment that travels the silhouette
    const segment = Math.max(56, Math.min(110, total * 0.04));
    const gap = Math.max(total - segment, total * 0.9);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animations: Animation[] = [];

    paths.forEach((path, i) => {
      path.style.strokeDasharray = `${segment} ${gap}`;
      path.style.opacity = i === 0 ? "1" : "0.4";

      if (reduce) {
        path.style.strokeDashoffset = String(total * 0.2);
        if (i > 0) path.style.opacity = "0";
        return;
      }

      path.style.strokeDashoffset = "0";
      animations.push(
        path.animate(
          [
            { strokeDashoffset: 0 },
            { strokeDashoffset: -total },
          ],
          {
            duration: duration * 1000,
            easing: "linear",
            iterations: Infinity,
          },
        ),
      );
    });

    return () => animations.forEach((a) => a.cancel());
  }, [duration, pathD]);

  const shared = {
    d: pathD,
    fill: "none" as const,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      className={cn("animated-outline", className)}
      viewBox="0 0 895 673"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g className="animated-outline-glitch">
        <path
          ref={ghostARef}
          className="animated-outline-path animated-outline-path--ghost-a"
          {...shared}
          stroke="#ff8a96"
        />
        <path
          ref={ghostBRef}
          className="animated-outline-path animated-outline-path--ghost-b"
          {...shared}
          stroke="#ff1228"
        />
        <path
          ref={mainRef}
          className="animated-outline-path animated-outline-path--main"
          {...shared}
          stroke={stroke}
        />
      </g>
    </svg>
  );
}
