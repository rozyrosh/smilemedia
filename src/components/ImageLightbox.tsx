"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  title?: string;
  category?: string;
};

type ImageLightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const isOpen = index !== null && items.length > 0;
  const current = isOpen ? items[index!] : null;
  const hasPrev = isOpen && index! > 0;
  const hasNext = isOpen && index! < items.length - 1;

  const goPrev = useCallback(() => {
    if (index !== null && index > 0) onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const goNext = useCallback(() => {
    if (index !== null && index < items.length - 1) onIndexChange(index + 1);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && current ? (
        <motion.div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title ?? "Design preview"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="image-lightbox-backdrop"
            aria-label="Close preview"
            onClick={onClose}
          />

          <motion.div
            className="image-lightbox-panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="image-lightbox-toolbar">
              <div className="image-lightbox-meta">
                {current.category ? (
                  <span className="image-lightbox-tag">{current.category}</span>
                ) : null}
                {current.title ? (
                  <h3 className="image-lightbox-title">{current.title}</h3>
                ) : null}
              </div>
              <div className="image-lightbox-actions">
                <span className="image-lightbox-counter">
                  {index! + 1} / {items.length}
                </span>
                <button
                  type="button"
                  className="image-lightbox-close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="image-lightbox-stage">
              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav-prev"
                aria-label="Previous image"
                disabled={!hasPrev}
                onClick={goPrev}
              >
                ‹
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  className="image-lightbox-image-wrap"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    width={1080}
                    height={1350}
                    className="image-lightbox-image"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                className="image-lightbox-nav image-lightbox-nav-next"
                aria-label="Next image"
                disabled={!hasNext}
                onClick={goNext}
              >
                ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
