export const caseQuestion = "What was the biggest driver of the decline?";

export const financials = [
  { label: "Revenue", prior: 24.0, current: 26.0 },
  { label: "Cost of goods", prior: 14.4, current: 15.6 },
  { label: "Store expenses", prior: 5.6, current: 7.8 },
  { label: "Operating profit", prior: 4.0, current: 2.6 },
] as const;

export function formatMillions(value: number) {
  return `${value < 0 ? "−" : ""}$${Math.abs(value).toFixed(1)}m`;
}

export const caseSteps = [
  {
    phase: "Diagnose",
    question: caseQuestion,
    options: [
      { label: "Revenue fell", feedback: "Revenue rose by $2.0m. Compare the two expense increases." },
      { label: "Cost of goods rose", feedback: "Cost of goods rose by $1.2m. Check whether store expenses rose by more." },
      { label: "Store expenses rose", correct: true, feedback: "Store expenses rose by $2.2m, the largest increase on the cost side." },
    ],
  },
  {
    phase: "Calculate",
    question: "How much did operating profit fall?",
    options: [
      { label: "$1.2m", feedback: "That’s the increase in cost of goods. Compare operating profit across the two years." },
      { label: "$1.4m", correct: true, feedback: "$4.0m − $2.6m = $1.4m. The $2.0m revenue gain covered only part of the $3.4m rise in costs." },
      { label: "$2.2m", feedback: "That’s the increase in store expenses. Revenue and cost of goods also changed." },
    ],
  },
  {
    phase: "Recommend",
    question: "What should the retailer investigate first?",
    options: [
      { label: "Which stores drove the expense increase", correct: true, feedback: "Compare expenses by store and category, such as labor and rent. The exhibit identifies where to look, and that breakdown can explain what changed." },
      { label: "Which products brought in less revenue", feedback: "Total revenue increased. Start with the line that contributed most to the overall profit decline." },
      { label: "Whether to raise all prices", feedback: "The exhibit doesn’t show how customers respond to price changes. Investigate the cause of the cost increase first." },
    ],
  },
];
