import type { CSSProperties } from "react";
import { ArrowDown, Menu } from "lucide-react";
import { CaseExercise } from "./case-exercise";
import { ProductPreview } from "./case-preview/preview";
import { ProfitBridge } from "./profit-bridge";

const navLinks = [
  { href: "#case", text: "Income statement" },
  { href: "#curriculum", text: "Curriculum" },
  { href: "#faq", text: "FAQ" },
];

const questions = [
  ["Who is Caselevel for?", "It’s designed for students preparing for consulting internships and entry-level roles, including people practicing their first case."],
  ["What math does the retail case require?", "You’ll read an income statement and calculate the change in operating profit with subtraction."],
  ["What feedback does Caselevel give?", "Every answer comes with an explanation. Work through all three questions to see an example recommendation for the retailer."],
];

const oneScreen = { "--h": 1 } as CSSProperties;

function Brand() {
  return <a className="nav__logo" href="#top">Caselevel</a>;
}

function CaseLink({ large = false }: { large?: boolean }) {
  return <a className={`btn btn--primary${large ? " btn--xl btn--wide" : ""}`} href="#case">Try a case<ArrowDown size={16} aria-hidden="true" /></a>;
}

export default function Home() {
  return (
    <>
      {/* Software. Centered hero, white and ink blue, Geist Serif and Geist Sans, centered nav, space between sections, type close, solid buttons, sky ground, Word Highlight. */}
      <header className="nav nav--centre">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="wrap nav__bar">
          <Brand />
          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map(({ href, text }) => <div className="nav__item" key={href}><a className="nav__link" href={href}>{text}</a></div>)}
          </nav>
          <div className="nav__actions"><CaseLink /></div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu"><Menu size={20} aria-hidden="true" /></button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero hero--centred" data-enter="" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text">
              <div className="hero__c">
                <h1 id="hero-h" data-enter-whole="">Consulting case practice</h1>
                <p className="hero__lead">Preparing for a consulting internship? Diagnose a retailer’s profit decline and make a recommendation in three questions.</p>
                <div className="btn-row hero__cta"><CaseLink /></div>
              </div>
              <div id="product-preview" className="hero__window" role="img" aria-label="Retail profitability case preview. The income statement shows operating profit falling from $4.0 million to $2.6 million.">
                <ProductPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="case" style={oneScreen} aria-labelledby="case-h" tabIndex={-1}>
          <div className="wrap">
            <div className="grid grid--top section-head case-head">
              <h2 className="span-5" id="case-h">Retail case income statement</h2>
              <p className="span-7 start-6">A retailer is selling more and earning less. Use its income statement to find out why and decide what the client should investigate first.</p>
            </div>
            <div className="frame case-frame" data-visual="">
              <CaseExercise />
            </div>
          </div>
        </section>

        <section className="section ground-surface" id="curriculum" style={oneScreen} aria-labelledby="curriculum-h" data-moment="word-highlight">
          <div className="wrap">
            <div className="section-head grid grid--top curriculum-head">
              <h2 className="span-5" id="curriculum-h">Consulting skills curriculum</h2>
              <p className="span-7 start-6 mo-wh__text">Trace the <strong>change in profit</strong> by adding the revenue gain and subtracting each increase in costs.</p>
            </div>
            <ProfitBridge />
            <dl className="curriculum-topics">
              <div><dt>Profitability</dt><dd>Find what changed in revenue and costs.</dd></div>
              <div><dt>Case structuring</dt><dd>Break a problem into questions you can investigate.</dd></div>
              <div><dt>Mental math</dt><dd>Calculate differences and margins.</dd></div>
              <div><dt>Market sizing</dt><dd>Estimate demand from stated assumptions.</dd></div>
            </dl>
          </div>
        </section>

        <section className="section" id="faq" style={oneScreen} aria-labelledby="questions-h">
          <div className="wrap">
            <div className="section-head"><h2 id="questions-h">Caselevel FAQ</h2></div>
            <div className="faq case-faq">
              {questions.map(([question, answer]) => (
                <article className="faq__item" key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing footer--columns ground-surface" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--type">
            <h2 id="close-h">Your first consulting case</h2>
            <CaseLink large />
          </div>
          <div className="closing__links">
            <div className="footer-navigation">
              <Brand />
              <nav aria-label="Footer navigation">
                {navLinks.map(({ href, text }) => <a key={href} href={href}>{text}</a>)}
              </nav>
            </div>
            <div className="footer__legal"><span>© 2026 Caselevel</span></div>
          </div>
        </div>
      </footer>
    </>
  );
}
