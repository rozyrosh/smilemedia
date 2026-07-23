"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type CarouselImage = {
  src: string;
  alt?: string;
};

export type CylinderCarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  /** Rotation period in seconds */
  animationDuration?: number;
  /**
   * Fixed card width in px. When omitted, cards scale to fill the section width.
   */
  cardWidth?: number;
};

export const CylinderCarousel = forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 32,
      cardWidth,
      ...props
    },
    ref,
  ) => {
    const N = images.length;
    const rootRef = useRef<HTMLDivElement>(null);
    const [autoWidth, setAutoWidth] = useState(280);

    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

    useEffect(() => {
      if (cardWidth != null) return;
      const root = rootRef.current;
      if (!root || N < 1) return;

      const update = () => {
        const cw = root.clientWidth;
        // Diameter ≈ cardWidth / tan(π/N); size cards so the cylinder spans ~full width
        const tanHalf = Math.tan(Math.PI / N);
        const targetDiameter = cw * 0.96;
        const next = Math.round(targetDiameter * tanHalf);
        setAutoWidth(Math.max(180, Math.min(next, 720)));
      };

      update();
      const ro = new ResizeObserver(update);
      ro.observe(root);
      return () => ro.disconnect();
    }, [cardWidth, N]);

    const width = cardWidth ?? autoWidth;

    const customStyle = {
      "--n": N,
      "--w": `${width}px`,
      "--ba": "calc(1turn / var(--n))",
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={rootRef}
        className={cn(
          "bb1-cyl-root w-full h-full min-h-[500px] grid place-items-center overflow-hidden",
          className,
        )}
        style={{
          perspective: "min(90vw, 1100px)",
          perspectiveOrigin: "50% 0%",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8% 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8% 92%, transparent)",
        }}
        {...props}
      >
        <div
          className={cn(
            "bb1-cyl-ring grid place-items-center [transform-style:preserve-3d]",
            containerClassName,
          )}
          style={{
            ...customStyle,
            animation: "bb1-cyl-ry var(--anim-dur) linear infinite",
          }}
        >
          <style>{`
            @keyframes bb1-cyl-ry {
              to { transform: rotateY(1turn); }
            }
            @media (prefers-reduced-motion: reduce) {
              .bb1-cyl-ring {
                animation-duration: 128s !important;
              }
            }
          `}</style>

          {images.map((img, i) => (
            <img
              key={`${img.src}-${i}`}
              src={img.src}
              alt={img.alt || `Carousel image ${i + 1}`}
              draggable={false}
              className={cn(
                "bb1-cyl-card [grid-area:1/1] object-cover rounded-2xl [backface-visibility:hidden]",
                cardClassName,
              )}
              style={
                {
                  width: "var(--w)",
                  aspectRatio: "7 / 10",
                  "--i": i,
                  transform:
                    "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    );
  },
);

CylinderCarousel.displayName = "CylinderCarousel";
