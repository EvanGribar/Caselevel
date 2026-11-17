"use client";

import { useState } from "react";
import { correctOption, financials, options } from "./case-data";

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
        <table className="financials">
          <caption className="visually-hidden">Two years of fictional retailer financials</caption>
          <thead><tr><th scope="col">USD</th><th scope="col">Year 1</th><th scope="col">Year 2</th></tr></thead>
          <tbody>
            {financials.map(({ label, prior, current }) => (
              <tr key={label}><th scope="row">{label}</th><td>{prior}</td><td>{current}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="app__pane app__pane--open">
        <p className="t-label">Retail profitability case</p>
        <div className="case-question">
          <fieldset>
            <legend>What drove the drop in profit?</legend>
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
