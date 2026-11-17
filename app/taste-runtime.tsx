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
  }, []);

  return null;
}
