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

  return null;
}
