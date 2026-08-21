"use client";

import Image from "next/image";
import { useState } from "react";
import { successStories } from "@/data/content";
import { Reveal } from "./Reveal";

export function SuccessStories() {
  const [active, setActive] = useState(0);
  const story = successStories[active];

  return (
    <section id="success-stories" className="stories-section">
      <Reveal className="stories-header">
        <div>
          <p className="section-eyebrow">Case Studies</p>
          <h2 className="section-title">
            SUCCESS
            <br />
            <span className="red">STORIES</span>
          </h2>
        </div>
        <div>
          <p className="stories-counter">
            <strong>{String(successStories.length).padStart(2, "0")}</strong> campaigns · measurable impact
          </p>
          <p className="section-sub">
            Real brands, real results — from launch awareness to viral
            engagement across social platforms.
          </p>
        </div>
      </Reveal>

      <Reveal className="stories-tabs" delay={0.1}>
        {successStories.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`story-tab ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="tab-num">{String(i + 1).padStart(2, "0")}</span>
            {s.tab}
          </button>
        ))}
      </Reveal>

      <Reveal className="stories-stage" delay={0.15}>
        <article className="story-panel active">
          <div className="story-panel-inner">
            <div className="story-main">
              <div className="story-watermark" aria-hidden>
                {String(active + 1).padStart(2, "0")}
              </div>
              <div className="story-logo">
                <Image
                  src={story.logo}
                  alt={story.client}
                  width={140}
                  height={56}
                  unoptimized={story.logo.endsWith(".svg")}
                />
              </div>
              <div className="story-client">{story.client}</div>
              <h3 className="story-title">{story.title}</h3>
              <p className="story-type">{story.type}</p>
              <div className="story-tags">
                {story.tags.map((tag) => (
                  <span key={tag} className="story-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {story.body.map((p) => (
                <p key={p.slice(0, 40)} className="story-body">
                  {p}
                </p>
              ))}
              <div className="story-highlights">
                <div className="story-highlights-title">
                  {story.highlights.title}
                </div>
                <ul className="story-bullets">
                  {story.highlights.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="story-stats">
              <div className="story-stats-label">Results Achieved</div>
              <div className="story-stat-grid">
                {story.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="story-stat-num">
                      {stat.num}
                      {stat.unit && <span className="unit">{stat.unit}</span>}
                      {stat.desc && (
                        <span className="story-stat-desc"> {stat.desc}</span>
                      )}
                    </div>
                    <div className="story-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="story-stats-foot">{story.footnote}</p>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal className="stories-progress" delay={0.2}>
        <span className="stories-progress-text">
          {String(active + 1).padStart(2, "0")} / {String(successStories.length).padStart(2, "0")}
        </span>
        <div className="stories-progress-bar">
          <div
            className="fill"
            style={{ width: `${((active + 1) / successStories.length) * 100}%` }}
          />
        </div>
      </Reveal>
    </section>
  );
}
