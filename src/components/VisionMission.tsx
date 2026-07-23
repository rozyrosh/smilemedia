import { visionMission } from "@/data/content";
import { Reveal } from "./Reveal";

export function VisionMission() {
  const marqueeItems = [
    ...visionMission.marquee,
    ...visionMission.marquee,
  ];

  return (
    <section id="vision" className="vision-section">
      <Reveal className="vm-header">
        <div className="vm-header-text">
          <p className="section-eyebrow">Who We Are</p>
          <h2 className="section-title">
            OUR PURPOSE &amp;
            <br />
            <span className="red">DIRECTION</span>
          </h2>
        </div>
        <div className="vm-stamp" aria-hidden>
          <div className="vm-stamp-ring" />
          <div className="vm-stamp-ring dashed" />
          <div className="vm-stamp-center">
            SM
            <br />
            26
          </div>
        </div>
      </Reveal>

      <Reveal className="vm-manifesto" delay={0.1}>
        {visionMission.manifesto.map((item) => (
          <div key={item.num} className="vm-manifesto-item">
            <div className="vm-manifesto-num">{item.num}</div>
            <div className="vm-manifesto-text">
              {item.text.split(" ").slice(0, 1).join(" ")}
              <br />
              {item.text.split(" ").slice(1).join(" ")}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="vm-grid" delay={0.15}>
        <article className="vm-card vm-card-vision">
          <div className="vm-card-num">01</div>
          <div className="vm-card-eyebrow">
            <span className="vm-card-dot" /> Vision
          </div>
          <div className="vm-card-title">
            OUR
            <br />
            <span className="red">VISION</span>
          </div>
          <p className="vm-card-text">{visionMission.vision.text}</p>
          <ul className="vm-pillars">
            {visionMission.vision.pillars.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="vm-card-cta">
            <span>{visionMission.vision.cta}</span>
            <span className="vm-card-cta-arrow">↗</span>
          </div>
          <div className="vm-accent">V</div>
        </article>

        <article className="vm-card vm-card-mission">
          <div className="vm-card-num">02</div>
          <div className="vm-card-eyebrow">
            <span className="vm-card-dot" /> Mission
          </div>
          <div className="vm-card-title">
            OUR
            <br />
            <span className="red">MISSION</span>
          </div>
          <p className="vm-card-text">{visionMission.mission.text}</p>
          <ul className="vm-pillars">
            {visionMission.mission.pillars.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="vm-card-cta">
            <span>{visionMission.mission.cta}</span>
            <span className="vm-card-cta-arrow">↗</span>
          </div>
          <div className="vm-accent">M</div>
        </article>
      </Reveal>

      <div className="vm-marquee" aria-hidden>
        <div className="vm-marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={`vm-marquee-item ${i % 2 === 1 ? "outline" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
