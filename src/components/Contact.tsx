import Link from "next/link";
import { brand, contact } from "@/data/content";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-text" aria-hidden>
        TALK
      </div>

      <div className="contact-wrap">
        <Reveal className="contact-left">
          <div className="contact-status">
            <span className="contact-status-dot" />
            <span>Available for new projects</span>
          </div>
          <p className="section-eyebrow">{contact.eyebrow}</p>
          <h2 className="contact-title">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            <span className="red">GREAT.</span>
          </h2>
          <p className="contact-desc">{contact.desc}</p>
        </Reveal>

        <Reveal className="contact-right" delay={0.15}>
          <div className="contact-cards">
            {contact.cards.map((card) => (
              <Link
                key={card.num}
                href={card.href}
                className="contact-card"
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                <div className="contact-card-num">{card.num}</div>
                <div className="contact-card-body">
                  <div className="contact-card-label">{card.label}</div>
                  <div className="contact-card-value">{card.value}</div>
                </div>
                <span className="contact-card-action">
                  <span>{card.action}</span>
                  <span className="arrow">↗</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="contact-socials">
            <span className="contact-socials-label">Follow Us</span>
            {contact.socials.map((s) => (
              <a key={s} href="#" className="contact-social" aria-label={s}>
                {s}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="contact-actions" delay={0.2}>
        <div className="contact-meta">
          {contact.meta.map((item, i) => (
            <div key={item.label} className="contact-meta-group">
              {i > 0 && <div className="contact-meta-divider" />}
              <div className="contact-meta-item">
                <span className="contact-meta-label">{item.label}</span>
                <span className="contact-meta-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="contact-ctas">
          <Link href={brand.website} className="btn-primary">
            Start a Project ↗
          </Link>
          <Link href={`tel:${brand.phone}`} className="contact-btn-ghost">
            Schedule a Call
          </Link>
        </div>
      </Reveal>

      <Reveal className="contact-closing" delay={0.25}>
        <div className="contact-closing-line" />
        <div className="contact-closing-text">
          <span className="contact-closing-asterisk">✻</span>
          <span>Have an idea?</span>
          <span className="contact-closing-red">Let&apos;s bring it to life.</span>
        </div>
        <div className="contact-closing-line" />
      </Reveal>
    </section>
  );
}
