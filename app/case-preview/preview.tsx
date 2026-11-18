"use client";

import { Stage } from "./kit/stage";
import { Text, Window } from "./kit/window";
import { Card } from "./kit/parts/Card";
import { Row } from "./kit/parts/Row";
import { caseSteps } from "../case-data";
import { CaseExhibit } from "../case-exhibit";
import "./preview.css";

const opening = caseSteps[0];

export function ProductPreview() {
  return (
    <Stage
      width={860}
      height={375}
      compact={{ below: 690, width: 342, height: 372 }}
      className="case-preview"
      accent="#244bc5"
      fidelity="realistic"
    >
      {(_, __, layout) => {
        const exhibit = (
          <div className="sc-exhibit">
            <Text className="sc-title">Income statement</Text>
            <CaseExhibit />
          </div>
        );

        return layout === "compact" ? (
          <Card className="sc-compact" pad="large" gap={16}>
            {exhibit}
            <div className="sc-prompt">
              <Text className="sc-phase">Diagnose · 1 of 3</Text>
              <Text className="sc-title">{opening.question}</Text>
            </div>
          </Card>
        ) : (
          <Window title="Retail profitability case" lights="grey" className="sc-window">
            <div className="sc-layout">
              {exhibit}
              <div className="sc-question">
                <Text className="sc-phase">Diagnose · 1 of 3</Text>
                <Text className="sc-title">{opening.question}</Text>
                <div className="sc-options">
                  {opening.options.map(({ label }) => (
                    <Row key={label} pad={8} title={label} />
                  ))}
                </div>
              </div>
            </div>
          </Window>
        );
      }}
    </Stage>
  );
}
