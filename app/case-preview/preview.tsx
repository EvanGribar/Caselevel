"use client";

import { Stage } from "./kit/stage";
import { Text, Window } from "./kit/window";
import { Row } from "./kit/parts/Row";
import { Card } from "./kit/parts/Card";
import "./preview.css";

const activities = [
  ["Learn", "Short lessons on consulting skills"],
  ["Practice", "Targeted drills and full business cases"],
  ["Review", "Feedback on your answers"],
];

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
            <Text className="sc-label">Consulting interview prep</Text>
            <Text className="sc-title">Your practice path</Text>
            <div className="sc-list">
              {activities.map(([name, detail], index) => (
                <Row
                  key={name}
                  pad={10}
                  className="sc-row"
                  lead={<Text className="sc-count">{"0" + (index + 1)}</Text>}
                  title={<Text className="sc-name">{name}</Text>}
                  subtitle={<Text className="sc-question">{detail}</Text>}
                />
              ))}
            </div>
            {compact && <Text className="sc-compact-path">Profitability skill path</Text>}
          </div>
        );

        return compact ? (
          <Card className="sc-compact" pad="small">{content}</Card>
        ) : (
          <>
            <Window title="Caselevel" lights="grey" className="sc-window">{content}</Window>
            <Card className="sc-detail" pad="medium">
              <Text className="sc-label">Skill path</Text>
              <Text className="sc-detail-total">Profitability</Text>
            </Card>
          </>
        );
      }}
    </Stage>
  );
}
