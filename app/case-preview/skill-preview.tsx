"use client";

import type { Act } from "./kit/act";
import { Stage } from "./kit/stage";
import { Text } from "./kit/window";
import { Card } from "./kit/parts/Card";
import { Connector } from "./kit/motion/Connector";
import { States } from "./kit/motion/States";
import "./skill-preview.css";

type TreeState = { step: number };

async function traceProfitDrivers(act: Act<TreeState>) {
  await act.wait(400);
  act.mark("trunk");
  act.put({ step: 1 });
  await act.wait(900);
  act.mark("branches");
  act.put({ step: 2 });
  await act.wait(1000);
  act.mark("drivers");
  act.put({ step: 3 });
}

const branches = [
  { name: "Revenue", target: "revenue", detail: "Price × volume" },
  { name: "Costs", target: "costs", detail: "Fixed + variable" },
];

export function SkillPreview() {
  return (
    <Stage<TreeState>
      width={576}
      height={400}
      compact={{ below: 465, width: 342, height: 284 }}
      className="skill-preview"
      initial={{ step: 0 }}
      poster={{ step: 3 }}
      play="once"
      script={traceProfitDrivers}
      fidelity="realistic"
      tokens={{ "--ss-accent": "#e2be74" }}
      theme="dark"
    >
      {(state, rect) => {
        const profit = rect("profit");
        const revenue = rect("revenue");
        const costs = rect("costs");
        const panel = rect("driver-panel");
        const start = { x: profit.x + profit.width / 2, y: profit.y + profit.height };
        const fork = { x: start.x, y: (start.y + panel.y) / 2 };

        return (
          <>
            <Text className="skill-preview__title">Profitability issue tree</Text>
            <Card pad="small" className="skill-preview__root" data-target="profit">
              <Text>Profit</Text>
            </Card>
            <Card pad="small" className="skill-preview__branches" data-target="driver-panel">
              {branches.map(({ name, target, detail }) => (
                <div key={target} className="skill-preview__branch" data-target={target}>
                  <Text className="skill-preview__branch-title">{name}</Text>
                  <States value={state.step >= 3 ? "visible" : "waiting"} states={{
                    waiting: <span />,
                    visible: <Text className="skill-preview__driver">{detail}</Text>,
                  }} />
                </div>
              ))}
            </Card>
            {profit.width > 0 && revenue.width > 0 && costs.width > 0 && panel.width > 0 && (
              <>
                <Connector from={start} to={fork} route="straight" show={state.step >= 1} dots="none" />
                {[revenue, costs].map((branch) => (
                  <Connector
                    key={branch.x}
                    from={fork}
                    to={{ x: branch.x + branch.width / 2, y: panel.y }}
                    route="h"
                    show={state.step >= 2}
                    dots="none"
                  />
                ))}
              </>
            )}
          </>
        );
      }}
    </Stage>
  );
}
