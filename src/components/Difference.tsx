import { difference } from "@/data/content";
import { Reveal } from "./Reveal";

export function Difference() {
  return (
    <section id="difference" className="difference-section">
      <Reveal>
        <p className="section-eyebrow muted">Our Advantage</p>
        <h2 className="section-title light">
          WHAT MAKES US
          <br />
          <span className="red">DIFFERENT</span>
        </h2>
        <p className="section-sub light-sub">{difference.sub}</p>
      </Reveal>

      <div className="diff-grid">
        {difference.cards.map((card, i) => (
          <Reveal key={card.num} delay={i * 0.08} className="diff-card-wrap">
            <article className="diff-card" data-num={card.num}>
              <div className="diff-title">
                {card.title.replace(", ", ",\n").split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
              <div className="diff-bar" />
              <p className="diff-text">{card.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
