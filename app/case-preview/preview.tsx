"use client";

import { financials, formatMillions } from "../case-data";
import { Chart } from "./kit/chart";
import { Stage } from "./kit/stage";
import { Text, Window } from "./kit/window";
import "./preview.css";

const measures = [financials[0], financials[3]];
const chartWidths = {
  wide: [302, 338],
  compact: [140, 140],
};

export function ProductPreview() {
  return (
    <Stage
      width={900}
      height={292}
      compact={{ below: 700, width: 358, height: 280 }}
      className="case-preview"
      accent="#244bc5"
      fidelity="realistic"
    >
      {(_, __, layout) => (
        <Window title="Retail performance" lights="grey" className="snapshot-window">
          <div className="snapshot-body">
            {measures.map(({ label, prior, current }, index) => (
              <div className="snapshot-measure" key={label}>
                <Text className="snapshot-label">{label}</Text>
                <div className="snapshot-plot">
                  <Chart
                    kind="bars"
                    data={[prior, current]}
                    width={chartWidths[layout][index]}
                    height={layout === "compact" ? 104 : 124}
                  />
                </div>
                <dl className="snapshot-axis">
                  <div><dt>Prior year</dt><dd>{formatMillions(prior)}</dd></div>
                  <div><dt>Current year</dt><dd>{formatMillions(current)}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </Window>
      )}
    </Stage>
  );
}
