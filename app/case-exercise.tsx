"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { caseSteps } from "./case-data";
import { CaseExhibit } from "./case-exhibit";

export function CaseExercise() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<number | null>(null);
  const heading = useRef<HTMLLegendElement>(null);
  const summary = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const exercise = caseSteps[step];
  const answer = submitted === null ? null : exercise?.options[submitted];

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    (heading.current ?? summary.current)?.focus();
  }, [step]);

  function goToStep(nextStep: number) {
    shouldFocus.current = true;
    setSelected(null);
    setSubmitted(null);
    setStep(nextStep);
  }

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer?.correct) goToStep(step + 1);
    else if (selected !== null) setSubmitted(selected);
  }

  return (
    <div className="ui app fill" role="region" aria-label="Retail profitability case">
      <div className="app__toolbar">
        <span className="app__brand">Caselevel</span>
        <span className="app__crumb">{exercise ? `${exercise.phase} · ${step + 1} of ${caseSteps.length}` : "Practice complete"}</span>
      </div>
      <div className="app__pane app__pane--list">
        <p className="app__title">Income statement</p>
        <CaseExhibit />
      </div>
      <div className="app__pane app__pane--open">
        {exercise ? (
          <form className="case-question" onSubmit={submitAnswer}>
            <fieldset disabled={answer?.correct}>
              <legend ref={heading} tabIndex={-1}>{exercise.question}</legend>
              <div className="choices">
                {exercise.options.map(({ label }, index) => (
                  <label className="choice" key={label}>
                    <input type="radio" name="answer" value={index} checked={selected === index}
                      onChange={() => { setSelected(index); setSubmitted(null); }} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button className="btn btn--secondary" type="submit" disabled={selected === null}>
              {answer?.correct ? step + 1 === caseSteps.length ? "See case summary" : "Next question" : "Check answer"}
            </button>
            <div className="case-result" role="status" aria-atomic="true">
              {answer && <p><strong>{answer.correct ? "Correct." : "Try again."}</strong> {answer.feedback}</p>}
            </div>
          </form>
        ) : (
          <div className="case-summary">
            <h3 className="app__title" ref={summary} tabIndex={-1}>Recommendation to the retailer</h3>
            <p>Operating profit fell by $1.4m. Store expenses were the biggest driver, rising by $2.2m. Break those costs down by location and category to find what changed before deciding where to cut.</p>
            <button className="btn btn--secondary" type="button" onClick={() => goToStep(0)}>Restart case</button>
          </div>
        )}
      </div>
    </div>
  );
}
