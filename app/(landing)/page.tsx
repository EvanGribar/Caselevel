import { ArrowRight } from "lucide-react";
import { CaseExhibit } from "../case-exhibit";
import { caseSteps } from "../case-data";
import { questions } from "../learning-content";
import { LandingNav, PracticeExamples } from "./landing-interactions";

const entryPoints = [
  {
    id: "example",
    href: "#lessons",
    title: "See a worked example",
    description: "Follow the reasoning behind a recommendation.",
    previewTitle: "Should a café open a second location?",
    previewText: "Start by working out how many orders the café needs to break even.",
  },
  {
    id: "case",
    href: null,
    title: "Case practice",
    description: "Read an exhibit and get feedback on your reasoning.",
    previewTitle: "Why did a retailer’s profit fall?",
    previewText: "Sales grew, but operating profit fell. Use the income statement to find out what changed.",
  },
] as const;

function ComingSoon({ light = false }: { light?: boolean }) {
  return <span className={`landing-button${light ? " landing-button--light" : ""}`}>Coming soon</span>;
}

export default function Home() {
  return (
    <>
      <LandingNav />
      <main id="main-content">
        <section className="landing-hero landing-wrap" aria-labelledby="hero-title">
          <div className="landing-hero__intro">
            <h1 id="hero-title">Prepare for consulting interviews</h1>
            <div>
              <p>Build your case interview skills with realistic business problems and feedback on your reasoning.</p>
              <ComingSoon />
            </div>
          </div>
          <figure className="landing-hero__frame" aria-label="A preview of the Caselevel retail profitability case">
            <div className="landing-app-preview">
              <aside aria-hidden="true">
                <strong>Caselevel</strong>
                <span>Practice</span>
                <span className="landing-app-preview__active">Retail profitability</span>
                <span>Case exhibit</span>
                <span>Recommendation</span>
              </aside>
              <div className="landing-app-preview__content">
                <div className="landing-app-preview__heading">
                  <h2>Retail profitability</h2><small>Diagnose</small>
                </div>
                <div className="landing-app-preview__panes">
                  <div><h3>Income statement</h3><CaseExhibit /></div>
                  <div className="landing-app-preview__prompt">
                    <h3>{caseSteps[0].question}</h3>
                    <ul>{caseSteps[0].options.map(({ label }) => <li key={label}>{label}</li>)}</ul>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </section>

        <section className="landing-entry landing-wrap" id="tracks" aria-labelledby="entry-title">
          <div className="landing-section-intro">
            <h2 id="entry-title">Start with a business question</h2>
          </div>
          <div className="landing-entry__grid">
            {entryPoints.map(({ id, href, title, description, previewTitle, previewText }) => {
              const className = `landing-entry-card landing-entry-card--${id}`;
              const content = (
                <>
                  <div className="landing-entry-card__copy">
                    <h3>{title}{href && <ArrowRight size={23} aria-hidden="true" />}</h3>
                    <p>{description}</p>
                    {!href && <span className="landing-button landing-button--outline">Coming soon</span>}
                  </div>
                  <div className="landing-entry-card__sheet" aria-hidden="true">
                    <span className="landing-entry-card__rail" />
                    <div>
                      <p className="landing-entry-card__question">{previewTitle}</p>
                      <p>{previewText}</p>
                    </div>
                  </div>
                </>
              );
              return href
                ? <a className={className} href={href} key={id}>{content}</a>
                : <article className={className} key={id}>{content}</article>;
            })}
          </div>
        </section>

        <section className="landing-feature" id="lessons" aria-labelledby="example-title">
          <div className="landing-wrap landing-feature__grid">
            <div className="landing-feature__art">
              <div className="landing-feature__sheet">
                <p>Monthly fixed costs <strong>$12,000</strong></p>
                <p>Contribution per order <strong>$4</strong></p>
                <p>Break-even volume <strong>3,000 orders</strong></p>
              </div>
            </div>
            <div className="landing-feature__copy">
              <h2 id="example-title">Should a café open a second location?</h2>
              <p>At $4 per order after variable costs, the café needs 3,000 orders a month to break even. A pop-up can help it test demand before signing a lease.</p>
            </div>
          </div>
        </section>

        <div className="landing-dark" data-landing-dark>
          <section className="landing-examples" id="how-it-works" aria-labelledby="examples-title">
            <div className="landing-wrap">
              <h2 className="landing-sans-heading" id="examples-title">From a short lesson to a full case</h2>
            </div>
            <PracticeExamples />
          </section>

          <section className="landing-faq" id="faq" aria-labelledby="faq-title">
            <div className="landing-wrap landing-faq__grid">
              <h2 className="landing-sans-heading" id="faq-title">Frequently asked questions</h2>
              <div>
                {questions.map(([question, answer]) => (
                  <details name="landing-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="landing-dark landing-footer" data-landing-dark>
        <div className="landing-wrap">
          <div className="landing-footer__cta"><h2>Consulting case practice</h2><ComingSoon light /></div>
          <div className="landing-footer__links">
            <div><a className="landing-wordmark" href="/" aria-label="Caselevel home">Caselevel</a><small>© {new Date().getFullYear()} Caselevel</small></div>
            <nav aria-label="Footer navigation">
              <div><h3>Learn</h3><a href="#lessons">Worked example</a></div>
              <div><h3>Caselevel</h3><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a></div>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
