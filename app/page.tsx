import type { CSSProperties } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { CaseExercise } from "./case-exercise";
import { ProductPreview } from "./case-preview/preview";
import { SkillPreview } from "./case-preview/skill-preview";

const navLinks = [
  { href: "#curriculum", text: "Curriculum" },
  { href: "#case", text: "Practice case" },
  { href: "#faq", text: "FAQ" },
];

const questions = [
  ["Who is Caselevel for?", "It’s designed for students preparing for consulting internships and entry-level roles, including people practicing their first case."],
  ["What should I know before starting?", "The path starts with revenue, costs and profit. You’ll use basic arithmetic and read figures from a table."],
  ["What feedback will I get?", "You get an explanation tied to the problem, so you can see what to change before your next attempt."],
];

const oneScreen = { "--h": 1 } as CSSProperties;

function Brand() {
  return <a className="nav__logo" href="#top">Caselevel</a>;
}

function CaseLink({ arrow = false }: { arrow?: boolean }) {
  return <a className="btn btn--primary" href="#case">Try a case{arrow && <ArrowUpRight className="m-arrow" size={17} aria-hidden="true" />}</a>;
}

export default function Home() {
  return (
    <>
      {/* software. Triptych, black and white with warm gold, Geist Serif and Geist Sans, centered nav, dark footer, word close, surface pairs, pill buttons, serif wordmark, topglow and band, Silk Folds, Liquid Type. */}
      <header className="nav nav--centre">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Brand />
          <nav className="nav__links" aria-label="Main navigation">
            {navLinks.map(({ href, text }) => <div className="nav__item" key={href}><a className="nav__link" href={href}>{text}</a></div>)}
          </nav>
          <div className="nav__actions"><CaseLink arrow /></div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu"><Menu size={20} aria-hidden="true" /></button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="top" className="hero hero--triptych bg-topglow" data-enter="" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="span-3">
                <h1 id="hero-h" data-enter-whole="">Consulting interview practice</h1>
                <p className="hero__lead">Short lessons, realistic cases, and feedback for your next attempt.</p>
              </div>
              <div className="ly-collage span-6 start-4">
                <div className="ly-collage__set is-on">
                  <div id="product-preview" className="hero__window" role="img" aria-label="Caselevel combines lessons, practice problems, and feedback. Profitability is one skill path.">
                    <ProductPreview />
                  </div>
                </div>
              </div>
              <div className="span-3 start-10 hero__cta"><CaseLink arrow /></div>
            </div>
          </div>
        </section>

        <section className="section ground-surface" id="curriculum" style={oneScreen} aria-labelledby="curriculum-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="curriculum-h">Case skills curriculum</h2>
            </div>
            <div className="grid curriculum-grid">
              <div className="span-5 curriculum-intro">
                <p>Learn a skill, apply it to a business problem, then review your reasoning.</p>
                <ul className="curriculum-topics" role="list">
                  <li>Profitability</li>
                  <li>Case structuring</li>
                  <li>Mental math</li>
                  <li>Market sizing</li>
                </ul>
              </div>
              <div className="span-7 curriculum-demo" id="curriculum-demo" role="img"
                aria-label="Profitability issue tree. Profit splits into revenue, driven by price and volume, and costs, split into fixed and variable costs.">
                <SkillPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="case" style={oneScreen} aria-labelledby="case-h">
          <div className="wrap">
            <div className="grid grid--top section-head case-head">
              <h2 className="span-5" id="case-h">Try the sample case</h2>
              <p className="span-7 start-6">Use a fictional retailer’s income statement to diagnose a profit decline and see how the feedback works.</p>
            </div>
            <div className="frame case-frame" data-visual="">
              <div className="case-frame__effect frame__fx" data-fx="silk-folds" data-fx-params='{"tone":2}' aria-hidden="true" />
              <CaseExercise />
            </div>
          </div>
        </section>

        <section className="section" id="faq" style={oneScreen} aria-labelledby="questions-h">
          <div className="wrap">
            <div className="section-head"><h2 id="questions-h" data-moment="liquid-type">Questions about Caselevel</h2></div>
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

      <footer className="footer closing footer--dark ground-inverse" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div><h2 id="close-h">Your first case</h2><p className="t-lead">See how Caselevel turns a business problem into a practice session.</p></div>
              <CaseLink arrow />
            </div>
            <p className="close__word" aria-hidden="true">Caselevel</p>
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
