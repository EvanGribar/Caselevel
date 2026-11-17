"use client";

import { useState } from "react";
import { caseQuestion, correctOption, options } from "./case-data";
import { CaseExhibit } from "./case-exhibit";

export function CaseExercise() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<number | null>(null);

  return (
    <div className="ui app fill" role="region" aria-label="Retail profitability case">
      <div className="app__toolbar">
        <span className="app__brand">Caselevel</span>
        <span className="app__crumb">Practice / Profitability</span>
      </div>
      <div className="app__pane app__pane--list">
        <p className="t-label">Exhibit 01</p>
        <p className="app__title">Income statement</p>
        <CaseExhibit />
      </div>
      <div className="app__pane app__pane--open">
        <p className="t-label">Retail profitability case</p>
        <div className="case-question">
          <fieldset>
            <legend>{caseQuestion}</legend>
            <div className="choices">
              {options.map(({ label }, index) => (
                <label className="choice" key={label}>
                  <input type="radio" name="driver" value={index} checked={selected === index}
                    onChange={() => { setSelected(index); setSubmitted(null); }} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <button className="btn btn--secondary" type="button" disabled={selected === null} onClick={() => setSubmitted(selected)}>Check answer</button>
          <div className="case-result" role="status" aria-atomic="true">
            {submitted !== null && (
              <p><strong>{submitted === correctOption ? "Correct." : "Try again."}</strong> {options[submitted].feedback}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
