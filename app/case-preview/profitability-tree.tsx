"use client";

import { useEffect, useState } from "react";
import type { Act } from "./kit/act";
import { Connector } from "./kit/motion/Connector";
import { Stage } from "./kit/stage";
import "./profitability-tree.css";

type Scene = { revealed: number };

const opening: Scene = { revealed: 0 };
const poster: Scene = { revealed: 2 };

async function drawTree(act: Act<Scene>) {
  await act.wait(240);
  act.mark("revenue");
  await act.set({ revealed: 1 });
  await act.wait(180);
  act.mark("costs");
  await act.set(poster);
}

export function ProfitabilityTree() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <figure className="lesson-showcase" aria-label="Operating profit breakdown" data-ready={ready}>
      <div className="lesson-showcase__fallback">
        <p>Operating profit</p>
        <div><p><strong>Revenue</strong><span>Price × volume</span></p><p><strong>Costs</strong><span>Fixed + variable costs</span></p></div>
      </div>
      <div className="lesson-showcase__animation" aria-hidden="true">
        <Stage width={1060} height={328} compact={{ below: 660, width: 328, height: 216 }}
          fill play="once" theme="light" accent="#7b5b33" initial={opening} poster={poster}
          script={ready ? drawTree : undefined}>
          {({ revealed }, _, layout) => {
            const compact = layout === "compact";
            const center = compact ? 164 : 530;
            const left = compact ? 82 : 266;
            const right = compact ? 246 : 794;
            const junction = compact ? 92 : 139;
            const edge = compact ? 120 : 180;

            return (
              <div className="lesson-showcase__tree">
                <div className="tree-node tree-node--root"><strong>Operating profit</strong></div>
                <div className="tree-node tree-node--revenue"><strong>Revenue</strong><span>Price × volume</span></div>
                <div className="tree-node tree-node--cost"><strong>Costs</strong><span>Fixed + variable costs</span></div>
                <Connector route="straight" dots="none" show={revealed > 0} from={{ x: center, y: compact ? 65 : 98 }} to={{ x: center, y: junction }} />
                <Connector className="tree-branch--revenue" dots="none" show={revealed > 0} from={{ x: center, y: junction }} to={{ x: left, y: edge }} />
                <Connector className="tree-branch--cost" dots="none" show={revealed > 1} from={{ x: center, y: junction }} to={{ x: right, y: edge }} />
              </div>
            );
          }}
        </Stage>
      </div>
    </figure>
  );
}
