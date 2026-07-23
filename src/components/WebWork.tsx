import Image from "next/image";
import Link from "next/link";
import { webWork as fallbackWebWork } from "@/data/content";
import { Reveal } from "./Reveal";

type WebWorkData = typeof fallbackWebWork;

export function WebWork({ data = fallbackWebWork }: { data?: WebWorkData }) {
  const webWork = data;
  return (
    <section id="web-work" className="web-work-section">
      <Reveal className="web-header">
        <div>
          <p className="section-eyebrow">Web Development</p>
          <h2 className="section-title">
            WEBSITES
            <br />
            <span className="red">WE BUILT</span>
          </h2>
        </div>
        <div>
          <p className="section-sub">{webWork.sub}</p>
        </div>
      </Reveal>

      <div className="web-grid">
        {webWork.sites.map((site, i) => (
          <Reveal key={site.domain} delay={i * 0.1}>
            <Link
              className="web-card"
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="web-card-num">{site.num}</div>
              <div className="web-frame">
                <div className="web-frame-bar">
                  <span className="web-frame-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="web-frame-url">{site.url}</span>
                </div>
                <div className="web-shot">
                  <Image
                    src={site.image}
                    alt={`${site.domain} preview`}
                    fill
                    className="web-shot-img"
                    sizes="400px"
                  />
                </div>
              </div>
              <div className="web-body">
                <span className="web-tag">{site.tag}</span>
                <div className="web-domain">{site.domain}</div>
                <p className="web-desc">{site.desc}</p>
                <span className="web-cta">
                  Visit Live <span className="arrow">↗</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
