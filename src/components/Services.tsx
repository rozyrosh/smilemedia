"use client";

import { useState } from "react";
import { services as fallbackServices } from "@/data/content";
import { Reveal } from "./Reveal";

type ServiceItem = (typeof fallbackServices)[number];

const SERVICE_TAGS: Record<string, string> = {
  "01": "BRAND & DESIGN",
  "02": "360° GROWTH",
  "03": "CINEMATIC & ADS",
  "04": "GROUND & BTL",
  "05": "FULL-STACK WEB",
  "06": "PRINT & GIFTS",
};

export function Services({ data = fallbackServices }: { data?: ServiceItem[] }) {
  const services = data;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="services-section services-linear-mode">
      <div className="services-bg" aria-hidden>
        <span className="services-bg-rail" />
        <span className="services-bg-wash" />
        <svg className="services-bg-smile" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
          <path
            className="services-bg-smile-path"
            d="M60 120 C220 320, 580 320, 740 120"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <span className="services-bg-signal">
          <i /><i /><i /><i /><i /><i /><i /><i />
        </span>
        <span className="services-bg-bar services-bg-bar-a" />
        <span className="services-bg-bar services-bg-bar-b" />
        <span className="services-bg-dot" />
        <span className="services-bg-label">LIVE · SIGNAL</span>
      </div>

      <aside className="services-wordmark" aria-hidden>
        <span className="wm-line" />
        CREATE — CONNECT — CONVERT
      </aside>

      <Reveal className="services-header">
        <div>
          <p className="section-eyebrow">Our Capabilities</p>
          <h2 className="section-title">
            WHAT WE
            <br />
            <span className="red">DO</span>
          </h2>
        </div>
        <div>
          <div className="services-counter">
            <span className="dot" />
            <span>
              <span className="current">
                {String(services.length).padStart(2, "0")}
              </span>{" "}
              <span className="total">CORE SERVICE PILLARS</span>
            </span>
          </div>
          <p className="section-sub">
            End-to-end creative, strategic, and digital solutions engineered to
            scale your brand and captivate your audience across every touchpoint.
          </p>
        </div>
      </Reveal>

      <Reveal className="services-row-container">
        <div className="services-row-strip">
          {services.map((service, index) => {
            const shortTag = SERVICE_TAGS[service.num] || "CORE PILLAR";
            const isHovered = hoveredIndex === index;

            return (
              <article
                key={service.num}
                className={`service-col-card ${isHovered ? "is-active" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="col-card-head">
                  <span className="col-card-tag">{shortTag}</span>
                  <h3 className="col-card-title">{service.name}</h3>
                </div>

                <ul className="col-card-items">
                  {service.items.map((item) => (
                    <li key={item} className="col-item-row">
                      <span className="col-item-mark" aria-hidden />
                      <span className="col-item-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
