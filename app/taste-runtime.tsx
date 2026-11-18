"use client";

import { useEffect } from "react";

export function TasteRuntime() {
  useEffect(() => {
    const modules = ["/assets/system.js", "/assets/layout/layout.js", "/assets/motion/motion.js"];
    for (const source of modules) {
      if (document.querySelector(`script[src="${source}"]`)) continue;
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
    if (reducedMotion.matches || typeof Element.prototype.animate !== "function") return;

    const animations = new Map<Element, Animation>();
    const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease").trim() || "ease-out";

    function reveal(target: Element, distance: number, duration: number, delay: number) {
      if (target.contains(document.activeElement) || target.closest(":target")) return;
      const animation = target.animate(
        [{ transform: `translateY(${distance}px)`, opacity: .3 }, { transform: "translateY(0)", opacity: 1 }],
        { duration, delay, easing, fill: "backwards" },
      );
      animations.set(target, animation);
      animation.onfinish = () => animations.delete(target);
    }

    const entries = new IntersectionObserver(items => {
      for (const { target, isIntersecting } of items) {
        if (!isIntersecting) continue;
        entries.unobserve(target);
        const delay = Number(target.getAttribute("data-landing-reveal"));
        reveal(target, delay ? 20 : 30, delay ? 470 : 540, delay);
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: .08 });

    const diagrams = new IntersectionObserver(items => {
      for (const { target, intersectionRatio } of items) {
        if (intersectionRatio < .35) continue;
        diagrams.unobserve(target);
        if (!target.closest(".track-card:focus-within")) target.setAttribute("data-draw", "");
      }
    }, { threshold: .35 });

    for (const element of document.querySelectorAll("[data-landing-reveal]")) {
      if (element.getBoundingClientRect().top >= window.innerHeight) entries.observe(element);
    }
    const trackDiagrams = document.querySelectorAll("[data-track-diagram]");
    for (const diagram of trackDiagrams) diagrams.observe(diagram);

    const showcase = document.querySelector(".lesson-showcase");
    if (showcase && !window.location.hash && window.scrollY < 24) reveal(showcase, 34, 600, 0);

    function cancelReveals() {
      entries.disconnect();
      diagrams.disconnect();
      for (const diagram of trackDiagrams) diagram.removeAttribute("data-draw");
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest("[data-landing-reveal]");
      if (!element) return;
      entries.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
      const diagram = element.querySelector("[data-track-diagram]");
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
