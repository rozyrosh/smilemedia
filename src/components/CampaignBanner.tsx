"use client";

import Link from "next/link";
import { useMemo } from "react";
import { campaignBanner } from "@/data/content";
import { CylinderCarousel } from "@/components/ui/CylinderCarousel";

export function CampaignBanner({ slides }: { slides?: string[] }) {
  const list = slides?.length ? slides : campaignBanner.slides;
  const images = useMemo(
    () =>
      list.map((src, i) => ({
        src,
        alt: `Campaign visual ${i + 1}`,
      })),
    [list],
  );

  return (
    <div className="big-banner-1">
      <div className="bb1-cylinder-scene">
        <CylinderCarousel
          images={images}
          animationDuration={32}
          className="bb1-cyl-embed"
        />
      </div>

      <div className="bb1-cylinder-vignette" aria-hidden />

      <div className="bb1-bg-word">CREATE</div>
      <div className="bb1-circle-big" />
      <div className="bb1-circle-med" />
    </div>
  );
}

export function SplitBanner() {
  return (
    <div className="big-banner-2">
      <div className="bb2-left">
        <div className="bb2-corner-tl" />
        <div className="bb2-corner-br" />
        <div className="bb2-left-num">01</div>
        <div className="bb2-left-tag">Graphic Design · Flyer</div>
        <div className="bb2-left-title">
          DESIGN
          <br />
          THAT
          <br />
          <span className="stroke">SPEAKS.</span>
        </div>
        <p className="bb2-left-body">
          From bold print flyers to scroll-stopping digital creatives — our
          design team translates your message into visuals that command
          attention.
        </p>
        <div className="bb2-left-foot">
          <span className="bb2-left-foot-label">Smile Media · Creative Studio</span>
          <Link href="#portfolio" className="bb2-left-foot-cta">
            View Work ↗
          </Link>
        </div>
      </div>

      <div className="bb2-right">
        <div className="bb2-right-num">02</div>
        <div className="bb2-right-tag">Banner · Social Media · Digital</div>
        <div className="bb2-right-title">
          BOLD.
          <br />
          BRIGHT.
          <br />
          UNFORGETTABLE.
        </div>
        <p className="bb2-right-body">
          We engineer every pixel with purpose — combining colour, form and
          story to make brands impossible to ignore.
        </p>
        <Link href="#contact" className="bb2-right-badge">
          Work With Us ↗
        </Link>
      </div>
    </div>
  );
}
