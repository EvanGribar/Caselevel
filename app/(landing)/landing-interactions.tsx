"use client";

import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const mobileToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll("[data-landing-dark]"));
    const breakpoint = window.matchMedia("(min-width: 960px)");
    function updateTheme() {
      setDark(darkSections.some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= 36 && bounds.bottom > 36;
      }));
    }
    function onResize() {
      if (breakpoint.matches) setMobileOpen(false);
    }
    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    breakpoint.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", updateTheme);
      breakpoint.removeEventListener("change", onResize);
    };
  }, []);

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="landing-nav" data-dark={dark && !mobileOpen}
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !mobileOpen) return;
        closeMenu();
        mobileToggle.current?.focus();
      }}>
      <a className="landing-skip" href="#main-content">Skip to content</a>
      <div className="landing-wrap landing-nav__bar">
        <a className="landing-wordmark" href="/" aria-label="Caselevel home">Caselevel</a>
        <button className="landing-nav__toggle" type="button" ref={mobileToggle} aria-controls="landing-navigation"
          aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
        <nav className="landing-nav__links" id="landing-navigation" data-open={mobileOpen} aria-label="Main navigation">
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#lessons" onClick={closeMenu}>Worked example</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <div className="landing-nav__actions">
            <span className="landing-button">Coming soon</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

const examples = [
  { label: "Learn", title: "Work through a concept with a short example.", href: "#lessons" },
  { label: "Practice", title: "Use a client brief and an exhibit to make a recommendation.", href: null },
  { label: "Review", title: "Check your answer and see the reasoning behind it.", href: null },
] as const;

export function PracticeExamples() {
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

  function goTo(index: number) {
    const element = track.current;
    const slide = element?.children[index];
    if (!(slide instanceof HTMLElement) || !element) return;
    element.scrollTo({ left: slide.offsetLeft - (element.clientWidth - slide.offsetWidth) / 2 });
    setSelected(index);
  }

  function syncSelection() {
    const element = track.current;
    if (!element) return;
    const center = element.scrollLeft + element.clientWidth / 2;
    const distances = Array.from(element.children, (slide) => {
      const item = slide as HTMLElement;
      return Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
    });
    setSelected(distances.indexOf(Math.min(...distances)));
  }

  return (
    <>
      <div className="landing-examples__track" ref={track} onScroll={syncSelection} aria-label="Learning steps">
        {examples.map(({ label, title, href }, index) => (
          <article className={`landing-example landing-example--${index}`} key={label}>
            <div><span>{label}</span><h3>{title}</h3>
              {href && <a className="landing-example__link" href={href} aria-label="See a worked example"><ArrowRight size={24} /></a>}
            </div>
          </article>
        ))}
      </div>
      <div className="landing-examples__controls" aria-label="Choose a learning step">
        <button type="button" aria-label="Previous step" disabled={selected === 0} onClick={() => goTo(selected - 1)}><ArrowLeft size={18} /></button>
        {examples.map(({ label }, index) => (
          <button type="button" key={label} aria-current={index === selected ? "step" : undefined} onClick={() => goTo(index)}>{label}</button>
        ))}
        <button type="button" aria-label="Next step" disabled={selected === examples.length - 1} onClick={() => goTo(selected + 1)}><ArrowRight size={18} /></button>
      </div>
    </>
  );
}
