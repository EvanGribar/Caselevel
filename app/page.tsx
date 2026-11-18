import { ArrowDown, ArrowRight, ChartColumn, ChevronDown, ClipboardCheck, Crosshair, Menu, Plus, Ruler, Signpost, TrendingUp, Workflow } from "lucide-react";
import { ProfitabilityTree } from "./case-preview/profitability-tree";

const tracks = [
  {
    id: "strategy",
    title: "Strategy Consulting",
    summary: "Evaluate opportunities and decide where a business should compete.",
    topics: [
      ["Market sizing", "Estimate demand using clear, defensible assumptions."],
      ["Market entry", "Weigh customer demand, competition, and the cost of entering."],
      ["Growth strategy", "Compare where to invest and explain the trade-offs."],
    ],
  },
  {
    id: "operations",
    title: "Operations Consulting",
    summary: "Diagnose what is holding a business back and decide what to improve.",
    topics: [
      ["Profitability", "Use an income statement to trace changes in revenue and cost."],
      ["Process improvement", "Find a bottleneck and identify which change would relieve it."],
      ["Case recommendations", "Turn evidence into a concrete next step for the client."],
    ],
  },
] as const;

const questions = [
  ["Who is Caselevel for?", "Students preparing for consulting internships and entry-level interviews. You can start without prior case experience."],
  ["What kinds of consulting does it cover?", "Strategy Consulting covers decisions like market entry and growth. Operations Consulting covers questions like profitability and process improvement."],
  ["How does the learning work?", "Learn a concept in a short lesson, use it to solve a business problem, and review the reasoning behind the answer."],
];

const trackIcons = {
  strategy: [Ruler, Signpost, TrendingUp],
  operations: [ChartColumn, Workflow, ClipboardCheck],
};

function TracksLink() {
  return <a className="btn btn--primary" href="#tracks">Explore tracks <ArrowRight size={16} aria-hidden="true" /></a>;
}

export default function Home() {
  return (
    <>
      <header className="nav nav--centre site-nav">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="wrap nav__bar">
          <a className="nav__logo" href="#top">Caselevel</a>
          <nav className="nav__links" id="main-navigation" aria-label="Main navigation">
            <div className="nav__item">
              <a className="nav__link" href="#tracks">Tracks<ChevronDown size={14} className="chev" aria-hidden="true" /></a>
              <button className="nav__expand" type="button" aria-label="Show Tracks links" aria-expanded="false" aria-controls="track-menu"><ChevronDown aria-hidden="true" /></button>
              <div className="nav__menu" id="track-menu">
                <div className="wrap menu-col track-menu">
                  {tracks.map(track => <a href={`#${track.id}`} key={track.id}>{track.title}<span>{track.summary}</span></a>)}
                </div>
              </div>
            </div>
            <div className="nav__item"><a className="nav__link" href="#curriculum">How it works</a></div>
            <div className="nav__item"><a className="nav__link" href="#faq">FAQ</a></div>
          </nav>
          <div className="nav__actions"><TracksLink /></div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Menu"><Menu size={20} aria-hidden="true" /></button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="caselevel-hero" aria-labelledby="hero-h">
          <div className="wrap hero-grid">
            <div className="hero-intro">
              <h1 id="hero-h">Prepare for consulting interviews</h1>
              <p>Learn strategy and operations in short lessons. Then solve a business case and get feedback on your reasoning.</p>
              <div className="hero-actions">
                <TracksLink />
                <a className="text-link" href="#curriculum">How it works <ArrowDown size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <ProfitabilityTree />
          </div>
        </section>

        <section className="section landing-section" id="tracks" aria-labelledby="tracks-h" tabIndex={-1}>
          <div className="wrap">
            <div className="section-head landing-head">
              <h2 id="tracks-h">Two consulting tracks</h2>
            </div>
            <div className="track-grid">
              {tracks.map(track => (
                <a className={`track-card track-card--${track.id}`} href={`#${track.id}`} key={track.id}>
                  <div className="track-card__intro">
                    <h3>{track.title}</h3>
                    <p>{track.summary}</p>
                    <span>Explore {track.id} <ArrowRight size={16} aria-hidden="true" /></span>
                  </div>
                  <div className="track-card__detail" data-track-diagram aria-hidden="true">
                    {track.id === "strategy" && <span className="track-card__origin"><Crosshair size={16} /></span>}
                    <ul className="track-card__nodes">
                      {track.topics.map(([topic], index) => {
                        const Icon = trackIcons[track.id][index];
                        return (
                          <li key={topic}>
                            <span className="track-card__node"><Icon size={16} /><span>{topic}</span></span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section landing-section lesson-section ground-surface" id="curriculum" aria-labelledby="lesson-h">
          <div className="wrap">
            <div className="section-head landing-head">
              <h2 id="lesson-h">From a short lesson to a full case</h2>
            </div>
            <ol className="learning-flow">
              <li><h3>Learn</h3><p>Study one concept through a short explanation and a worked example.</p></li>
              <li><h3>Practice</h3><p>Use a client brief and an exhibit to make a recommendation.</p></li>
              <li><h3>Review</h3><p>Review the reasoning behind the answer before your next case.</p></li>
            </ol>
          </div>
        </section>

        <section className="section landing-section curriculum-section" aria-labelledby="curriculum-h">
          <div className="wrap">
            <h2 id="curriculum-h">What you’ll learn</h2>
            <div className="track-grid">
              {tracks.map(track => (
                <article className="curriculum-track" id={track.id} key={track.id} aria-labelledby={`${track.id}-h`} tabIndex={-1}>
                  <h3 id={`${track.id}-h`}>{track.title}</h3>
                  {track.topics.map(([topic, description], index) => (
                    <details key={topic} name={`${track.id}-topics`} open={index === 0}>
                      <summary>{topic}<Plus size={16} aria-hidden="true" /></summary>
                      <p>{description}</p>
                    </details>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section landing-section landing-faq ground-surface" id="faq" aria-labelledby="faq-h">
          <div className="wrap">
            <div className="landing-split faq-split">
              <h2 id="faq-h">Frequently asked questions</h2>
              <div className="question-list">
                {questions.map(([question, answer], index) => (
                  <details key={question} name="caselevel-faq" open={index === 0}>
                    <summary>{question}<Plus size={16} aria-hidden="true" /></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer ground-inverse case-footer">
        <div className="wrap">
          <div className="case-footer__cta">
            <h2>Choose your consulting track</h2>
            <TracksLink />
          </div>
          <div className="case-footer__navigation">
            <a className="nav__logo" href="#top" aria-label="Caselevel, back to top">Caselevel</a>
            <nav aria-label="Footer navigation">
              <div>
                <h3>Tracks</h3>
                <a href="#strategy">Strategy Consulting</a>
                <a href="#operations">Operations Consulting</a>
              </div>
              <div>
                <h3>Caselevel</h3>
                <a href="#curriculum">How it works</a>
                <a href="#faq">FAQ</a>
              </div>
            </nav>
          </div>
          <div className="case-footer__legal"><small>© 2026 Caselevel</small></div>
        </div>
      </footer>
    </>
  );
}
