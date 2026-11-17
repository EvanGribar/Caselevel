"use client";

import { Stage } from "./kit/stage";
import { Text, Window } from "./kit/window";
import { Card } from "./kit/parts/Card";
import { caseQuestion } from "../case-data";
import { CaseExhibit } from "../case-exhibit";
import "./preview.css";

export function ProductPreview() {
  return (
    <Stage
      width={530}
      height={420}
      compact={{ below: 465, width: 342, height: 324 }}
      className="case-preview"
      accent="#e2be74"
      fidelity="realistic"
    >
      {(_, __, layout) => {
        const compact = layout === "compact";
        const content = (
          <div className="sc-main">
            <Text className="sc-label">Retail profitability case</Text>
            <Text className="sc-title">Income statement</Text>
            <CaseExhibit />
            {compact && <Text className="sc-prompt">{caseQuestion}</Text>}
          </div>
        );

        return compact ? (
          <Card className="sc-compact" pad="small">{content}</Card>
        ) : (
          <>
            <Window title="Caselevel" lights="grey" className="sc-window">{content}</Window>
            <Card className="sc-detail" pad="medium">
              <Text className="sc-prompt">{caseQuestion}</Text>
            </Card>
          </>
        );
      }}
    </Stage>
  );
}
