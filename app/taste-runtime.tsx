"use client";

import { useEffect } from "react";

export function TasteRuntime() {
  useEffect(() => {
    const source = "/assets/system.js";
    if (!document.querySelector(`script[src="${source}"]`)) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = source;
      document.body.append(script);
    }

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav__link[href^='#']"));
    const sections = document.querySelectorAll<HTMLElement>("main > section[id]");
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting);
      if (!current) return;
      for (const link of links) {
        if (link.hash === `#${current.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }, { rootMargin: "-20% 0px -79% 0px" });

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    const diagrams = new IntersectionObserver(items => {
      for (const { target, intersectionRatio } of items) {
        if (intersectionRatio < .35) continue;
        diagrams.unobserve(target);
        if (!target.closest(".track-card:focus-within")) target.setAttribute("data-draw", "");
      }
    }, { threshold: .35 });

    const trackDiagrams = document.querySelectorAll("[data-track-diagram]");
    for (const diagram of trackDiagrams) diagrams.observe(diagram);

    function cancelReveals() {
      diagrams.disconnect();
      for (const diagram of trackDiagrams) diagram.removeAttribute("data-draw");
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const diagram = event.target.closest(".track-card")?.querySelector("[data-track-diagram]");
      if (diagram) {
        diagrams.unobserve(diagram);
        diagram.removeAttribute("data-draw");
      }
    }

    document.addEventListener("focusin", revealFocusedContent);
    reducedMotion.addEventListener("change", cancelReveals);
    return () => {
      cancelReveals();
      document.removeEventListener("focusin", revealFocusedContent);
      reducedMotion.removeEventListener("change", cancelReveals);
    };
  }, []);

  return null;
}
